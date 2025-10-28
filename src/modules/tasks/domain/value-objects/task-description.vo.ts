

export class TaskDescription {
  private readonly value: string;

  constructor(description: string) {
    this.validate(description);
    this.value = description.trim();
  }

  private validate(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('The task description cannot be empty');
    }

    if (description.trim().length < 4) {
      throw new Error('The description must have at least 4 characters');
    }

    if (description.trim().length > 500) {
      throw new Error('The description cannot exceed 500 characters.');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: TaskDescription): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
