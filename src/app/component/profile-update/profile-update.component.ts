import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/UserService';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  id!: string;
  user!: User;
  currentId!: string | null;
  role: string | null = localStorage.getItem('roleName');
  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    passport: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    dateOfBirth: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/[789][0-9]{9}/)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    street: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    house: new FormControl('', [Validators.required]),
    flat: new FormControl(''),
    photo: new FormControl(new File([],''))
  })

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentId = localStorage.getItem("userId");
    this.route.params.subscribe(params => this.id = params['id']);
    this.userService
      .getById(this.id)
      .subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (response) => {
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            Object.values(response.error.errors).map((message) => {
              alert(message);
            });
          }
          if (response.status >= 500) {
            alert("Something happened on the server!")
          }
        }
      })
  }

  onSubmitForm() {
    if (this.updateForm.get('photo')?.value != null) {
      this.userService
        .addPhoto(this.updateForm, this.id)
        .subscribe({
          next: (res) => {
            alert("Photo is saved!");
          },
          error: (response) => {
            if (response.status === 400 || response.status === 401 || response.status === 404) {
              Object.values(response.error.errors).map((message) => {
                alert(message);
              });
            }
            if (response.status >= 500) {
              alert("Something happened on the server!")
            }
          }
        })
    }
    this.userService
      .update(this.updateForm)
      .subscribe({
        next: (res) => {
          this.router.navigate([`/profile/${this.id}`]);
          alert("Information is saved!");
        },
        error: (response) => {
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            Object.values(response.error.errors).map((message) => {
              alert(message);
            });
          }
          if (response.status >= 500) {
            alert("Something happened on the server!")
          }
        }
      })
  }

}
