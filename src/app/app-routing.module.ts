import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileUpdateComponent } from './component/profile-update/profile-update.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { DishesComponent } from './component/dishes/dishes.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path: 'register', component:  RegistrationComponent},
  { path: 'profile/:id', component:  ProfileComponent},
  { path: 'employees', component:  EmployeeComponent},
  { path: 'home', component:  HomeComponent},
  { path: 'profile/:id/update', component:  ProfileUpdateComponent},
  { path: 'statistics', component:  StatisticsComponent},
  { path: 'dishes', component:  DishesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
