
export class UserCriteria {

    role: string;
    surname: string;

    constructor(
        role: string,
        surname: string) {
        this.role = role;
        this.surname = surname;
    }
}