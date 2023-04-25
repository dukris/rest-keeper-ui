import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/UserService';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user!: User;
  link: string = " ";
  role:string | null = localStorage.getItem('roleName');

  constructor(
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService
      .getById()
      .subscribe({
        next: (res) => {
          this.user = new User(
            res['id'],
            res['name'],
            res['surname'],
            res['email'],
            res['role'],
            res['passport'],
            res['dateOfBirth'],
            res['phoneNumber'],
            res['photoPath'],
            res['score']
          )
          this.link = 'https://play.min.io/restkeeper/' + this.user.photoPath;
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
