import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";



@Injectable()
export class DishService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/dishes`, { withCredentials: true });
    }

    getByAvailability(availability: any): Observable<any> {
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/dishes`, { params: new HttpParams().set('availability', availability), withCredentials: true });
    }

    getById(id: any): Observable<any> {
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/dishes/${id}`, { withCredentials: true })
    }

    delete(id: any): Observable<any> {
        return this.http
            .delete(`http://localhost:8080/restkeeper/v1/dishes/${id}`, { withCredentials: true })
    }

    update(updateForm: FormGroup, id: any): Observable<any> {
        let dish = updateForm.getRawValue();
        dish.id = id;
        return this.http
            .put(`http://localhost:8080/restkeeper/v1/dishes/${id}`, dish, { withCredentials: true })
    }

    create(createForm: FormGroup): Observable<any> {
        let dish = createForm.getRawValue();
        return this.http
            .post(`http://localhost:8080/restkeeper/v1/dishes`, dish, { withCredentials: true })
    }

}