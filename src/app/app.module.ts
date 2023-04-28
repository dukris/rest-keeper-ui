import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from './service/AuthApiService';
import { AuthInterceptor } from './interseptor/interseptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './component/registration/registration.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UserService } from './service/UserService';
import { EmployeeComponent } from './component/employee/employee.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileUpdateComponent } from './component/profile-update/profile-update.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { DishService} from './service/DishService';
import { StatisticsService } from './service/StatisticsService';
import { DishComponent } from './component/dish/dish.component';
import { DishUpdateComponent } from './component/dish-update/dish-update.component';
import { DishCreateComponent } from './component/dish-create/dish-create.component';
import { OrderService } from './service/OrderService';
import { OrderCreateComponent } from './component/order-create/order-create.component';
import { OrderSubmitComponent } from './component/order-submit/order-submit.component';
import { OrderComponent } from './component/order/order.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    EmployeeComponent,
    HomeComponent,
    ProfileUpdateComponent,
    StatisticsComponent,
    DishComponent,
    DishUpdateComponent,
    DishCreateComponent,
    OrderCreateComponent,
    OrderSubmitComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
 ],
  providers: [    
    AuthApiService,
    UserService,
    DishService,
    StatisticsService,
    OrderService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
