import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/UserService';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  id!: string | null;
  currentId!: string | null;
  user!: User;
  link: string = " ";
  role: string | null = localStorage.getItem('roleName');

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentId = localStorage.getItem("userId");
    this.route.params.subscribe(params => this.id = params['id']);
    this.userService
      .getById(this.id)
      .subscribe({
        next: (res) => {
          this.user = res;
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

  delete() {
    this.userService
      .delete(this.id)
      .subscribe({
        next: (res) => {
          alert("User is deleted successfully!");
          this.router.navigate(["/employees"]);
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

  deletePhoto() {
    this.userService
      .deletePhoto(this.user.photoPath, this.id)
      .subscribe({
        next: (res) => {
          alert("Photo is deleted successfully!");
          this.router.navigate([`/profile/${this.id}`]);
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
