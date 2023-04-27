
export class Address {

    id: string | null;
    city: string | null;
    street: string | null;
    house: string | null;
    flat: string | null;
  
    constructor(
      id: string | null,
      city: string | null,
      street: string | null,
      house: string | null,
      flat: string | null) {
      this.id = id;
      this.city = city;
      this.street = street;
      this.house = house;
      this.flat = flat;
    }
  
  }