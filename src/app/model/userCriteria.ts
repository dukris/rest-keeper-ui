
export class UserCriteria {

    role: string | null;
    surname: string | null;

    constructor(
        role: string | null,
        surname: string | null) {
        this.role = role;
        this.surname = surname;
    }
}