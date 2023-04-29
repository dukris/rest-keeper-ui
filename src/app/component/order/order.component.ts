import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/OrderService';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  currentId: string | null = localStorage.getItem("userId");
  role: string | null = localStorage.getItem('roleName');
  orders: Order[] = [];
  createForm = new FormGroup({
    tableNumber: new FormControl('', [Validators.required]),
    amountOfGuests: new FormControl('', [Validators.required])
  })

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderService
      .getAll()
      .subscribe({
        next: (res) => {
          this.orders = res;
          this.orders.forEach(order => {
            switch (order.status) {
              case 'RECEIVED': {
                order.status = "Received";
                break;
              };
              case 'PROCESSING': {
                order.status = "Processing";
                break;
              };
              case 'COOKED': {
                order.status = "Cooked";
                break;
              };
              case 'COMPLETED': {
                order.status = "Completed";
                break;
              };
            }
          });
          this.orders.sort((n1,n2) => {
            if (n2.status=='Received') {
                return 1;
            }
            if (n1.status=='Received') {
                return -1;
            }
            if (n1.status=='Completed') {
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
            alert("Something happened on the server!")
          }
        }
      })
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

  delete(id: any){
    this.orderService
    .delete(id)
    .subscribe({
      next: (res) => {
        alert("Order is deleted sucessfully!");
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

  changeStatus(id: any, status: any){
    this.orderService
    .changeStatus(id, status)
    .subscribe({
      next: (res) => {
        alert("Status of order is updated sucessfully!");
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

}

