
export class User {

    id: number;
    name: string;
    surname: string;
    email: string;
    role: string;
    passport: string;
    dateOfBirth: string;
    phoneNumber: number;
    photoPath: string;
    score: number;

    constructor(
      id: number,
      name: string,
      surname: string,
      email: string,
      role: string,
      passport: string,
      dateOfBirth: string,
      phoneNumber: number,
      photoPath: string,
      score: number) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.passport = passport;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.photoPath = photoPath;
        this.score = score;
       }

}