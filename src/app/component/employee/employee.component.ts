import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../service/AuthApiService';
import { UserService } from 'src/app/service/UserService';
import { User } from 'src/app/model/user';
import { UserCriteria } from 'src/app/model/userCriteria';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id!: string | null;
  role: string | null = " ";
  users: User[] = [];
  userCriteria: UserCriteria = new UserCriteria(null, null);

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

  // surnameSearch() {
  //   this.userService
  //     .getBySurname(this.surnameForm.get('searchSurname')?.value)
  //     .subscribe({
  //       next: (res) => {
  //         this.id = localStorage.getItem('userId');
  //         this.role = localStorage.getItem('roleName');
  //         this.users = res;
  //         this.users.forEach(user => {
  //           user.photoPath = 'https://play.min.io/restkeeper/' + user.photoPath;
  //           switch (user.role) {
  //             case 'ROLE_HALL': {
  //               user.role = "Hall";
  //               break;
  //             };
  //             case 'ROLE_KITCHEN': {
  //               user.role = "Kitchen";
  //               break;
  //             };
  //             case 'ROLE_ADMIN': {
  //               user.role = "Administrator";
  //               break;
  //             };
  //           }
  //           this.router.navigate(["/employees"]);
  //         });
  //       },
  //       error: (response) => {
  //         if (response.status === 400 || response.status === 401 || response.status === 404) {
  //           Object.values(response.error.errors).map((message) => {
  //             alert(message);
  //           });
  //         }
  //         if (response.status >= 500) {
  //           alert("something happened on the server")
  //         }
  //       }
  //     })
  // }

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
              Object.values(response.error.errors).map((message) => {
                alert(message);
              });
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
  }
}
