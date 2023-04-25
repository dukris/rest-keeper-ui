import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../service/AuthApiService';
import { UserService } from 'src/app/service/UserService';
import { User } from 'src/app/model/user';
import { UserCriteria } from 'src/app/model/usercriteria';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  role: string | null = " ";
  users: User[] = [];
  userCriteria!: UserCriteria;

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService
      .getAll(this.userCriteria)
      .subscribe({
        next: (res) => {
          this.role = localStorage.getItem('roleName');
          this.users = res;
          this.users.forEach(user => user.photoPath = 'https://play.min.io/restkeeper/' + user.photoPath);
        },
        error: (response) => {
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            Object.values(response.error.errors).map((message) => {
              alert(message);
            });
          }
          if (response.status >= 500) {
            alert("something happened on the server")
          }
        }
      })
  }

  onSubmitForm() {

  }
}
