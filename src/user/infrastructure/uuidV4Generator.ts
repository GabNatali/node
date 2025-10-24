import { UuidAdapter } from '../../config/uuid.adapater';
import { UuidGenerator } from '../domain/utils/uuiGenerator';

export class UuidIdGenerator implements UuidGenerator {
    generate(): string {
        return UuidAdapter.generateUuidv4();
    }
}