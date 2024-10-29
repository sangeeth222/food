import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { FoodsComponent } from 'src/app/foods/foods.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from 'src/app/signup/signup.component';
import { HomeComponent } from 'src/app/home/home.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { BuyComponent } from 'src/app/buy/buy.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AboutusComponent } from 'src/app/aboutus/aboutus.component';
import { ContactComponent } from 'src/app/contact/contact.component';
import { CareerComponent } from './career/career.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FoodsComponent,
    SignupComponent,
    HomeComponent,
    CartComponent,
    BuyComponent,
    AboutusComponent,
    ContactComponent,
    CareerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule, MatDialogModule



  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]


})
export class AppModule { }
