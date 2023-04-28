import { Dish } from "./dish";
import { User } from "./user";

export class Order {

  id: string | null;
  tableNumber: string | null;
  amountOfGuests: string | null;
  dishAmountMap: Map<Dish, number> | undefined;
  cost: string | null;
  time: string | null;
  status: string | null;
  user: User;

  constructor(
    id: string | null,
    tableNumber: string | null,
    amountOfGuests: string | null,
    dishAmountMap: Map<Dish, number> | undefined,
    cost: string | null,
    time: string | null,
    status: string | null,
    user: User) {
    this.id = id;
    this.tableNumber = tableNumber;
    this.amountOfGuests = amountOfGuests;
    this.dishAmountMap = dishAmountMap;
    this.cost = cost;
    this.time = time;
    this.cost = cost;
    this.status = status;
    this.user = user;

  }
}