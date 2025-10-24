import { randomUUID } from 'crypto';
// import { v4 as uuidv4 } from 'uuid';


export class UuidAdapter {
    static generateUuidv4(): string {
        return randomUUID();
    }
}