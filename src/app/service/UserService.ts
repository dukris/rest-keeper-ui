import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import Cookies from "universal-cookie";



@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getAll(searchCriteria: any): Observable<any> {
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/users`, { params: searchCriteria, withCredentials: true });
    }

    getById(): Observable<any> {
        let id = localStorage.getItem('userId');
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/users/${id}`, { withCredentials: true })
    }

    delete(id: any): Observable<any> {
        return this.http
            .delete(`http://localhost:8080/restkeeper/v1/users/${id}`, { withCredentials: true })
    }

    update(updateForm: FormGroup): Observable<any> {
        let id = localStorage.getItem('userId');
        let user = updateForm.getRawValue()
        return this.http
            .put(`http://localhost:8080/restkeeper/v1/users/${id}`, user, { withCredentials: true })
    }

    addPhoto(updateForm: FormGroup): Observable<any> { //todo
        let id = localStorage.getItem('userId');
        let user = updateForm.getRawValue()
        return this.http
            .post(`http://localhost:8080/restkeeper/v1/users/${id}/photo`, user, { withCredentials: true })
    }

    deletePhoto(filename: any): Observable<any> {
        let id = localStorage.getItem('userId');
        return this.http
            .delete(`http://localhost:8080/restkeeper/v1/users/${id}/photo`, { params: filename, withCredentials: true })
    }

}