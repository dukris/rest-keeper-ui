import { Address } from "./address";

export class User {

  id: string | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  role: string | null;
  passport: string | null;
  dateOfBirth: string | null;
  phoneNumber: string | null;
  photoPath: string | null;
  score: string | null;
  address: Address;

  constructor(
    id: string | null,
    name: string | null,
    surname: string | null,
    email:  string | null,
    role:  string | null,
    passport:  string | null,
    dateOfBirth:  string | null,
    phoneNumber:  string | null,
    photoPath:  string | null,
    score:  string | null,
    address: Address) {
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
    this.address = new Address(
      null,
      address.city,
      address.street,
      address.house,
      address.flat
    );
  }

}