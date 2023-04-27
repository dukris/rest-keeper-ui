
export class Dish {

    id: string | null;
    name: string | null;
    price: string | null;
    description: string | null;
    availability: string | null;
  
    constructor(
      id: string | null,
      name: string | null,
      description: string | null,
      price: string | null,
      availability: string | null) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.availability = availability;
    }
  
  }