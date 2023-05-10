
export class Address {

    id: string | null;
    city: string;
    street: string;
    house: string;
    flat: string | null;
  
    constructor(
      id: string | null,
      city: string,
      street: string,
      house: string,
      flat: string | null) {
      this.id = id;
      this.city = city;
      this.street = street;
      this.house = house;
      this.flat = flat;
    }
  
  }