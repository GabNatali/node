export class UserEntity {
    constructor(   
        public readonly id: string,
        public readonly email: string,
    ){}


    static createNew({ id, email }: { id: string; email: string }) {
        return new UserEntity(id, email);
    }
}