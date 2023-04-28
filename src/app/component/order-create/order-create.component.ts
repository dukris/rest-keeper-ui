import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/OrderService';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  currentId: string | null = localStorage.getItem("userId");
  role: string | null = localStorage.getItem('roleName');
  order!: Order;
  createForm = new FormGroup({
    tableNumber: new FormControl('', [Validators.required]),
    amountOfGuests: new FormControl('', [Validators.required])
  })

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmitForm() {
    this.orderService
      .create(this.createForm, this.currentId)
      .subscribe({
        next: (res) => {
          this.router.navigate([`/orders/${res.id}/submit`]);
          alert("New order is created sucessfully!")
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

