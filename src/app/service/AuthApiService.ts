import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import Cookies from "universal-cookie";



@Injectable()
export class AuthApiService {

    constructor(private http: HttpClient) {}
    
    login(loginForm: FormGroup ): Observable<any> {
    let user = loginForm.getRawValue()
    return this.http
      .post(`http://localhost:8080/restkeeper/v1/auth/login`, user, { withCredentials: true })
  }

  register(registerForm: FormGroup ): Observable<any> {
    
    let user = JSON.stringify(registerForm.getRawValue())
    return this.http
      .post(`http://localhost:8080/restkeeper/v1/auth/register`, user)
  }


    updateFromRefresh() : Observable<any>{
        const cookies = new Cookies();
        const jwtToken = cookies.get('refresh'); 
        return this.http.post(`http://localhost:8080/restkeeper/v1/auth/refresh`, { withCredentials: true })
    }

}