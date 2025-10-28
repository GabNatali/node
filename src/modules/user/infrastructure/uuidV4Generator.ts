import { UuidAdapter } from '../../../config/uuid.adapater';
import { UuidGenerator } from '../../../shared/utils/uuiGenerator';

export class UuidIdGenerator implements UuidGenerator {
    generate(): string {
        return UuidAdapter.generateUuidv4();
    }
}