import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../service/AuthApiService';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cookies: Cookies = new Cookies();
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.pattern(/.+@.+\.[a-zA-Z0-9]+/i), Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  })

  constructor(private authApi: AuthApiService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('userId')
    localStorage.removeItem('roleName')
    this.cookies.remove('access');
    this.cookies.remove('refresh');
  }

  onSubmitForm() {
    this.authApi
      .login(this.loginForm)
      .subscribe({
        next: (res) => {
          localStorage.removeItem('userId')
          localStorage.removeItem('roleName')
          this.cookies.set('access', res.accessToken, { path: '/', expires: new Date(Number(res.expTime)) });
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('roleName', res.roleName);
          this.router.navigate([`/profile/${res.userId}`]);
        },
        error: (response) => {
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            alert(response.error.msg)
          }
          if (response.status >= 500) {
            alert("Something happened on the server!")
          }
        }
      })
  }
}
