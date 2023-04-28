import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileUpdateComponent } from './component/profile-update/profile-update.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { DishComponent } from './component/dish/dish.component';
import { DishUpdateComponent } from './component/dish-update/dish-update.component';
import { DishCreateComponent } from './component/dish-create/dish-create.component';
import { OrderCreateComponent } from './component/order-create/order-create.component';
import { OrderSubmitComponent } from './component/order-submit/order-submit.component';
import { OrderComponent } from './component/order/order.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path: 'register', component:  RegistrationComponent},
  { path: 'profile/:id', component:  ProfileComponent},
  { path: 'employees', component:  EmployeeComponent},
  { path: 'home', component:  HomeComponent},
  { path: 'profile/:id/update', component:  ProfileUpdateComponent},
  { path: 'statistics', component:  StatisticsComponent},
  { path: 'dishes', component:  DishComponent},
  { path: 'dishes/:id/update', component:  DishUpdateComponent},
  { path: 'dishes/create', component:  DishCreateComponent},
  { path: 'orders/create', component: OrderCreateComponent},
  { path: 'orders/:id/submit', component: OrderSubmitComponent},
  { path: 'orders', component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
