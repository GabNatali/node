export class Email {
    constructor(public readonly value: string) {}

    static normalize(raw: string): string {
        return raw.trim().toLowerCase();
    }

    static isValid(normalized: string): boolean {
        if (normalized.length === 0 || normalized.length > 254) return false;

        const [local, domain] = normalized.split('@');
        if (!local || !domain) return false;
        if (local.length > 64) return false;
        if (domain.length > 255) return false;

        if (/\s/.test(normalized)) return false;

        if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;

        const domainLabel = /^(?!-)[a-z0-9-]{1,63}(?<!-)$/i;
        const labels = domain.split('.');
        if (labels.length < 2) return false;
        if (!labels.every(l => domainLabel.test(l))) return false;

        const EMAIL_REGEX =
            /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

        return EMAIL_REGEX.test(normalized);
    }

    static create(raw: string): Email {
        const normalized = Email.normalize(raw);
        if (!Email.isValid(normalized)) {
            throw new Error('Email inválido.');
        }
        return new Email(normalized);
    }

    toString(): string {
        return this.value;
    }
}

