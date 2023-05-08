import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/OrderService';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  currentId: string | null = localStorage.getItem("userId");
  role: string | null = localStorage.getItem('roleName');
  orders: Order[] = [];
  cookies: Cookies = new Cookies();
  searchForm = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    status: new FormControl('')
  })

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.cookies.get('access') == null) {
      localStorage.removeItem('userId')
      localStorage.removeItem('roleName')
      this.router.navigate(["/login"]);
    }
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
            order.time = order.time?.replace("T", " ").substring(0, 16)!;
          });
          this.orders.sort((n1, n2) => {
            if (n2.status == 'Completed') {
              return -1;
            }
            return 1;
          });
        },
        error: (response) => {
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            alert(response.error.msg)
          }
          if (response.status >= 500) {
            alert("Something happened on the server!")
          }
        }
      })
  }

  onSubmitForm() {
    this.orderService
      .getByCriteria(this.searchForm)
      .subscribe({
        next: (res) => {
          this.orders = res;
          console.log(res);
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
          this.orders.sort((n1, n2) => {
            if (n2.status == 'Completed') {
              return -1;
            }
            return 1;
          });
        },
        error: (response) => {
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            alert(response.error.msg)
          }
          if (response.status >= 500) {
            alert("Something happened on the server!")
          }
        }
      })
  }

  delete(id: any) {
    this.orderService
      .delete(id)
      .subscribe({
        next: (res) => {
          alert("Order is deleted sucessfully!");
          this.router.navigate([`/orders`]);
        },
        error: (response) => {
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            alert(response.error.msg)
          }
          if (response.status >= 500) {
            alert("Something happened on the server!")
          }
        }
      })
  }

  changeStatus(id: any, status: any) {
    this.orderService
      .changeStatus(id, status)
      .subscribe({
        next: (res) => {
          alert("Status of order is updated sucessfully!");
          this.router.navigate([`/orders`]);
        },
        error: (response) => {
          if (response.status === 400 || response.status === 401 || response.status === 404) {
            alert(response.error.msg)
          }
          if (response.status >= 500) {
            alert("Something happened on the server!")
          }
        }
      })
  }

  logout() {
    localStorage.removeItem('userId')
    localStorage.removeItem('roleName')
    this.cookies.remove('access');
    this.cookies.remove('refresh');
    this.router.navigate(["/login"]);
  }

}

