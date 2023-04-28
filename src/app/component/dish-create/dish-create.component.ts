import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Dish } from '../../model/dish';
import { DishService } from '../../service/DishService';

@Component({
  selector: 'app-dish-create',
  templateUrl: './dish-create.component.html',
  styleUrls: ['./dish-create.component.css']
})
export class DishCreateComponent implements OnInit {
  dish!: Dish;
  createForm = new FormGroup({
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
  }

  onSubmitForm() {
    this.dishService
      .create(this.createForm)
      .subscribe({
        next: (res) => {
          this.router.navigate([`/dishes`]);
          alert("New dish is added sucessfully!")
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
