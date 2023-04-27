import { Dish } from "./dish";

export class Statistics {

    dailyRevenue: string | null;
    monthlyRevenue: string | null;
    averageBill: string | null;
    dailyAmountOfGuests: string | null;
    firstHalfAmountOfGuests: string | null;
    lastHalfAmountOfGuests: string | null;
    dailyDish: Dish;

    constructor(
        dailyRevenue: string | null,
        monthlyRevenue: string | null,
        averageBill: string | null,
        dailyAmountOfGuests: string | null,
        firstHalfAmountOfGuests: string | null,
        lastHalfAmountOfGuests: string | null,
        dailyDish: Dish) {
        this.dailyRevenue = dailyRevenue;
        this.monthlyRevenue = monthlyRevenue;
        this.averageBill = averageBill;
        this.dailyAmountOfGuests = dailyAmountOfGuests;
        this.firstHalfAmountOfGuests = firstHalfAmountOfGuests;
        this.lastHalfAmountOfGuests = lastHalfAmountOfGuests;
        this.dailyDish = dailyDish;
    }

}