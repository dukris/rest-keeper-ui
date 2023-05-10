import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthApiService } from 'src/app/service/AuthApiService';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {

  id!: string;
  user!: User;
  currentId!: string | null;
  role: string | null = localStorage.getItem('roleName');
  cookies: Cookies = new Cookies();
  updateForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required])
  })

  constructor(
    private authService: AuthApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.cookies.get('access') == null) {
      localStorage.removeItem('userId')
      localStorage.removeItem('roleName')
      this.router.navigate(["/login"]);
    }
    this.currentId = localStorage.getItem("userId");
    this.route.params.subscribe(params => this.id = params['id']);
  }

  onSubmitForm() {
    this.authService
      .updatePassword(this.updateForm)
      .subscribe({
        next: (res) => {
          this.router.navigate([`/profile/${this.currentId}`]);
          alert("Password is updated!");
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


  logout(){
    localStorage.removeItem('userId')
    localStorage.removeItem('roleName')
    this.cookies.remove('access');
    this.cookies.remove('refresh');
    this.router.navigate(["/login"]);
  }

}
