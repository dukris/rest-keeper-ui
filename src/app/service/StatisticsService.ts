import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable()
export class StatisticsService {

    constructor(private http: HttpClient) { }

    get(): Observable<any> {
        return this.http
            .get(`http://localhost:8080/restkeeper/v1/statistics`, { withCredentials: true });
    }
    
}