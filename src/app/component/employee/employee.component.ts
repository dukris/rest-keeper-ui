import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../service/AuthApiService';
import { UserService } from 'src/app/service/UserService';
import { User } from 'src/app/model/user';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id!: string | null;
  role: string | null = " ";
  users: User[] = [];
  cookies: Cookies = new Cookies();

  surnameForm = new FormGroup({
    searchSurname: new FormControl('', [Validators.required])
  })

  roleForm = new FormGroup({
    searchRole: new FormControl('', [Validators.required])
  })

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    if (this.cookies.get('access') == null) {
      localStorage.removeItem('userId')
      localStorage.removeItem('roleName')
      this.router.navigate(["/login"]);
    }
    this.userService
      .getAll()
      .subscribe({
        next: (res) => {
          this.id = localStorage.getItem('userId');
          this.role = localStorage.getItem('roleName');
          this.users = res;
          this.users.forEach(user => {
            user.photoPath = 'https://play.min.io/restkeeper/' + user.photoPath;
            switch (user.role) {
              case 'ROLE_HALL': {
                user.role = "Hall";
                break;
              };
              case 'ROLE_KITCHEN': {
                user.role = "Kitchen";
                break;
              };
              case 'ROLE_ADMIN': {
                user.role = "Administrator";
                break;
              };
            }
          });
        },
        error: (response) => {
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            alert(response.error.msg)
          }
          if (response.status >= 500) {
            alert("something happened on the server")
          }
        }
      })
  }

  roleSearch(value: any) {
    if (value == "All") {
      this.userService
        .getAll()
        .subscribe({
          next: (res) => {
            this.id = localStorage.getItem('userId');
            this.role = localStorage.getItem('roleName');
            this.users = res;
            this.users.forEach(user => {
              user.photoPath = 'https://play.min.io/restkeeper/' + user.photoPath;
              switch (user.role) {
                case 'ROLE_HALL': {
                  user.role = "Hall";
                  break;
                };
                case 'ROLE_KITCHEN': {
                  user.role = "Kitchen";
                  break;
                };
                case 'ROLE_ADMIN': {
                  user.role = "Administrator";
                  break;
                };
              }
            });
          },
          error: (response) => {
            if (response.status === 400 || response.status === 401 || response.status === 404) {
              alert(response.error.msg)
            }
            if (response.status >= 500) {
              alert("something happened on the server")
            }
          }
        })
    } else {
      this.userService
        .getByRole(value)
        .subscribe({
          next: (res) => {
            this.id = localStorage.getItem('userId');
            this.role = localStorage.getItem('roleName');
            this.users = res;
            this.users.forEach(user => {
              user.photoPath = 'https://play.min.io/restkeeper/' + user.photoPath;
              switch (user.role) {
                case 'ROLE_HALL': {
                  user.role = "Hall";
                  break;
                };
                case 'ROLE_KITCHEN': {
                  user.role = "Kitchen";
                  break;
                };
                case 'ROLE_ADMIN': {
                  user.role = "Administrator";
                  break;
                };
              }
              this.router.navigate(["/employees"]);
            });
          },
          error: (response) => {
            if (response.status === 400 || response.status === 401 || response.status === 404) {
              alert(response.error.msg)
            }
            if (response.status >= 500) {
              alert("something happened on the server")
            }
          }
        })
    }
  }
  logout(){
    localStorage.removeItem('userId')
    localStorage.removeItem('roleName')
    this.cookies.remove('access');
    this.cookies.remove('refresh');
    this.router.navigate(["/login"]);
  }
}
