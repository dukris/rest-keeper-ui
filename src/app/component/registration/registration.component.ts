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

  id!: string | null;
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.pattern(/.+@.+\.[a-zA-Z0-9]+/i), Validators.required]),
    passport: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  })
  
  constructor(private authApi: AuthApiService, private router: Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('userId');
  }

  onSubmitForm(){ 
    this.authApi
    .register(this.registerForm)
    .subscribe({
      next: (res) => {
        this.router.navigate([`/profile/${this.id}`]);
          alert("New employee is registered sucessfully!")
      },
      error: (response) => {
        if (response.status === 400|| response.status === 401 || response.status === 404){
          alert(response.error.msg)    
      }
      if (response.status >= 500) {
         alert("something happened on the server")
        }      
      }
    })
  }
}