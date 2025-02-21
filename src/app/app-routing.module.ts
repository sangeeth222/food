import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from 'src/app/buy/buy.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { FoodsComponent } from 'src/app/foods/foods.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { HomeComponent } from 'src/app/home/home.component';
 
import { LoginComponent } from 'src/app/login/login.component';
 
import { SignupComponent } from 'src/app/signup/signup.component';
import { AboutusComponent } from 'src/app/aboutus/aboutus.component';
import { ContactComponent } from 'src/app/contact/contact.component';
import { CareerComponent } from './career/career.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [


  { path: "food", component: FoodsComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: HeaderComponent },
  { path: "", component: HomeComponent },
  { path: "cart", component: CartComponent },
  { path: 'buy', component: BuyComponent },
  { path: "cart", component: CartComponent },
  { path: "about", component: AboutusComponent },
  { path: "contact", component: ContactComponent },
  { path: "career", component: CareerComponent },
  { path: "nav", loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
