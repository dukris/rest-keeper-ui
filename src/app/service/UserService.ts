import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Address } from "../model/address";
import { User } from "../model/user";



@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/users`, { withCredentials: true });
    }

    getByRole(role: any): Observable<any> {
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/users`, { params: new HttpParams().set('role', role), withCredentials: true });
    }

    getBySurname(surname: any): Observable<any> {
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/users`, { params: new HttpParams().set('surname', surname), withCredentials: true });
    }

    getById(id: any): Observable<any> {
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/users/${id}`, { withCredentials: true })
    }

    delete(id: any): Observable<any> {
        return this.http
            .delete(`http://localhost:8080/restkeeper/v1/users/${id}`, { withCredentials: true })
    }

    update(updateForm: FormGroup): Observable<any> {
        let id = localStorage.getItem('userId');
        let user = new User(
            id,
            updateForm.get('name')?.value,
            updateForm.get('surname')?.value,
            null,
            null,
            updateForm.get('passport')?.value,
            updateForm.get('dateOfBirth')?.value,
            updateForm.get('phoneNumber')?.value,
            null,
            null,
            new Address(
                null,
                updateForm.get('city')?.value,
                updateForm.get('street')?.value,
                updateForm.get('house')?.value,
                updateForm.get('flat')?.value
            )
        );
        return this.http
            .put(`http://localhost:8080/restkeeper/v1/users/${id}`, user, { withCredentials: true })
    }

    addPhoto(photoForm: FormGroup, id: any): Observable<any> {
        const formData = new FormData();
        console.log(photoForm.value);
        for (const key of Object.keys(photoForm.value)) {
            const value = photoForm.value[key];
            formData.append(key, value);
        }
        return this.http
            .post(`http://localhost:8080/restkeeper/v1/users/${id}/photos`, formData, { withCredentials: true })
    }

    deletePhoto(filename: any, id: any): Observable<any> {
        return this.http
            .delete(`http://localhost:8080/restkeeper/v1/users/${id}/photos`, { params: new HttpParams().set('filename', filename), withCredentials: true })
    }

}