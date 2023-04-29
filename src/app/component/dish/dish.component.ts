import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dish } from 'src/app/model/dish';
import { DishService } from 'src/app/service/DishService';

@Component({
  selector: 'app-dishes',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  id!: string | null;
  role: string | null = " ";
  dishes: Dish[] = [];

  searchForm = new FormGroup({
    availability: new FormControl('', [Validators.required])
  })

  constructor(
    private router: Router,
    private dishService: DishService) { }

  ngOnInit(): void {
    this.dishService
      .getAll()
      .subscribe({
        next: (res) => {
          this.id = localStorage.getItem('userId');
          this.role = localStorage.getItem('roleName');
          this.dishes = res;
          this.dishes.sort((n1,n2) => {
            if (n2.availability) {
                return 1;
            }
        
            if (n1.availability) {
                return -1;
            }
            return 0;
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

  search(value: any) {
    if (value == "Available") {
      this.dishService
        .getByAvailability(true)
        .subscribe({
          next: (res) => {
            this.dishes = res;
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
      this.dishService
      .getAll()
      .subscribe({
        next: (res) => {
          this.id = localStorage.getItem('userId');
          this.role = localStorage.getItem('roleName');
          this.dishes = res;
          this.dishes.sort((n1,n2) => {
            if (n2.availability) {
                return 1;
            }
        
            if (n1.availability) {
                return -1;
            }
            return 0;
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

  delete(dishId: any) {
    this.dishService
      .delete(dishId)
      .subscribe({
        next: (res) => {
          alert("Dish is deleted successfully!");
          this.router.navigate(["/dishes"]);
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
