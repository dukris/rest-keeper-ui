import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Order } from "../model/order";
import { User } from "../model/user";
import { Address } from "../model/address";



@Injectable()
export class OrderService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/orders`, { withCredentials: true });
    }

    getByPeriod(from: any, to: any): Observable<any> {
        let params = new HttpParams();
        params.set('from', from);
        params.set('to', to);
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/orders`, { params: params, withCredentials: true });
    }

    getByStatus(status: any): Observable<any> {
        let params = new HttpParams();
        params.set('status', status);
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/orders`, { params: params, withCredentials: true });
    }

    getByPeriodAndStatus(from: any, to: any, status: any): Observable<any> {
        let params = new HttpParams();
        params.set('from', from);
        params.set('to', to);
        params.set('status', status);
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/orders`, { params: params, withCredentials: true });
    }

    getById(id: any): Observable<any> {
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/orders/${id}`, { withCredentials: true })
    }

    delete(id: any): Observable<any> {
        return this.http
            .delete(`http://localhost:8080/restkeeper/v1/orders/${id}`, { withCredentials: true })
    }

    create(createForm: FormGroup, userId: any): Observable<any> {
        let address = new Address(
            null,
            null,
            null,
            null,
            null
        )
        let user = new User(
            userId,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            address);
        let order = new Order(
            null,
            createForm.get('tableNumber')?.value,
            createForm.get('amountOfGuests')?.value,
            undefined,
            null,
            null,
            null,
            user);
        return this.http
            .post(`http://localhost:8080/restkeeper/v1/orders`, order, { withCredentials: true })
    }

    changeStatus(id: any, status: any): Observable<any> {
        return this.http
            .post(`http://localhost:8080/restkeeper/v1/orders/${id}/status`, { params: new HttpParams().set('status', status), withCredentials: true })
    }

    addDish(orderId: any, dishId: any, amount: any): Observable<any> {
        return this.http
            .post(`http://localhost:8080/restkeeper/v1/orders/${orderId}/dishes/${dishId}?amount=${amount}`, 
            { withCredentials: true })
    }

    submit(id: any): Observable<any> {
        return this.http
            .post(`http://localhost:8080/restkeeper/v1/orders/${id}`, { withCredentials: true })
    }

}