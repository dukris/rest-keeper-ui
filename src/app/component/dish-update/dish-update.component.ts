import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Dish } from '../../model/dish';
import { DishService } from '../../service/DishService';

@Component({
  selector: 'app-dish-update',
  templateUrl: './dish-update.component.html',
  styleUrls: ['./dish-update.component.css']
})
export class DishUpdateComponent implements OnInit {
  id!: string;
  currentId: string | null = localStorage.getItem("userId");
  dish!: Dish;
  role: string | null = localStorage.getItem('roleName');
  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
    price: new FormControl('', [Validators.required]),
    availability: new FormControl('', [Validators.required])
  })

  constructor(
    private dishService: DishService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.dishService
      .getById(this.id)
      .subscribe({
        next: (res) => {
          this.dish = res;
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
    this.dishService
      .update(this.updateForm, this.id)
      .subscribe({
        next: (res) => {
          this.router.navigate([`/dishes`]);
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
