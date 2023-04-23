import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../service/AuthApiService';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.pattern(/.+@.+\.[a-zA-Z0-9]+/i), Validators.required]),
    passport: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  
  constructor(private authApi: AuthApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitForm(){ 
    this.authApi
    .register(this.registerForm)
    .subscribe({
      next: (res) => {
          this.router.navigate(['/login'])
          alert("user is registered sucessfully")
      },
      error: (response) => {
        if (response.status === 400|| response.status === 401 || response.status === 404){
         Object.values( response.error.errors).map((message) => {
               alert(message);
           });        
      }
      if (response.status >= 500) {
         alert("something happened on the server")
        }      
      }
    })
  }
}