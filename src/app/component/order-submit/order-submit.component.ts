import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Dish } from 'src/app/model/dish';
import { Order } from 'src/app/model/order';
import { DishService } from 'src/app/service/DishService';
import { OrderService } from 'src/app/service/OrderService';

@Component({
  selector: 'app-order-submit',
  templateUrl: './order-submit.component.html',
  styleUrls: ['./order-submit.component.css']
})
export class OrderSubmitComponent implements OnInit {
  currentId: string | null = localStorage.getItem("userId");
  role: string | null = localStorage.getItem('roleName');
  orderId!: string;
  order!: Order;
  dishes: Dish[] = [];

  amountForm = new FormGroup({
    amount: new FormControl('', [Validators.required])
  })

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private dishService: DishService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.orderId = params['id']);
    this.orderService
      .getById(this.orderId)
      .subscribe({
        next: (res) => {
          this.order = res;
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
            alert("Something happened on the server!")
          }
        }
      })


  }

  getDish(id: any): any {
    this.dishService
      .getById(id)
      .subscribe({
        next: (res) => {
          return res;
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

  submit() {
    this.orderService
      .submit(this.orderId)
      .subscribe({
        next: (res) => {
          alert("Order is received successfully!")
          this.router.navigate([`/orders`]);
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

  addDish(id: any, amount: any) {
    this.orderService
      .addDish(this.orderId, id, amount)
      .subscribe({
        next: (res) => {
          this.order = res;
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


