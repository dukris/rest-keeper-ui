import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EmployeeComponent } from './component/employee/employee.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path: 'register', component:  RegistrationComponent},
  { path: 'profile', component:  ProfileComponent},
  { path: 'employees', component:  EmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
