

export class TaskTitle {
  private readonly value: string;

  constructor(title: string) {
    this.validate(title);
    this.value = title.trim();
  }

  private validate(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('El título de la tarea no puede estar vacío');
    }

    if (title.trim().length < 3) {
      throw new Error('El título debe tener al menos 3 caracteres');
    }

    if (title.trim().length > 100) {
      throw new Error('El título no puede exceder 100 caracteres');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: TaskTitle): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
