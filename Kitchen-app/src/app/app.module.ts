import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AddFruitComponent } from './admin/add-fruit/add-fruit.component';
import { DeleteFruitComponent } from './admin/admin-fruits/delete-fruit/delete-fruit.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import {
  DialogAnimationsExampleDialog,
  SignupComponent,
} from './signup/signup.component';
import { UserNavBarComponent } from './user-nav-bar/user-nav-bar.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminOrderComponent } from './admin-orders/admin-order/admin-order.component';
import { UserHomeFruitCardComponent } from './home/user-home-fruit-card/user-home-fruit-card.component';
import { UserOrderComponent } from './user-orders/user-order/user-order.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FruitServices } from './services/fruit.service';
import { CartServices } from './services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminNavBarComponent } from './admin/admin-nav-bar/admin-nav-bar.component';
import { AdminFruitsComponent } from './admin/admin-fruits/admin-fruits.component';
import { UserOrderServices } from './services/user-order.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { UserServices } from './services/user.service';
import { NotificationService } from './services/notification/notification.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AdminOrderServices } from './services/admin-order.service';
import { NoItemsComponent } from './no-items/no-items.component';
import { SortPipe } from './shared/sort.pipe';

const routes: Routes = [
  { path: '', title: 'Login', component: LoginComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'signup', title: 'Signup', component: SignupComponent },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    title: 'Cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders',
    title: 'Orders',
    component: UserOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    title: 'Admin | Fruits',
    component: AdminComponent,
    children: [
      {
        path: 'fruits',
        component: AdminFruitsComponent,
        children: [
          {
            path: 'addFruit',
            component: AddFruitComponent,
          },
          {
            path: 'editFruit/:id',
            component: AddFruitComponent,
          },
          {
            path: 'deleteFruit/:id',
            component: DeleteFruitComponent,
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        title: 'Admin | Orders',
        component: AdminOrdersComponent,
        children: [
          {
            path: ':id',
            component: AdminOrderComponent,
          },
        ],
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'page-not-found',
    title: 'Page not found',
    component: PageNotFoundComponent,
  },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddFruitComponent,
    DeleteFruitComponent,
    AdminNavBarComponent,
    CartComponent,
    HomeComponent,
    LoginComponent,
    MainNavBarComponent,
    SignupComponent,
    UserNavBarComponent,
    UserOrdersComponent,
    AdminOrderComponent,
    UserHomeFruitCardComponent,
    UserOrderComponent,
    AdminFruitsComponent,
    AdminOrdersComponent,
    PageNotFoundComponent,
    DialogAnimationsExampleDialog,
    NoItemsComponent,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    FruitServices,
    AdminOrderServices,
    CartServices,
    UserOrderServices,
    UserServices,
    NotificationService,
    AdminFruitsComponent,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  entryComponents: [
    AddFruitComponent,
    DeleteFruitComponent,
    AdminOrderComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
