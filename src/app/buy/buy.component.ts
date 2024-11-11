import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/api.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  userId: any;
  cartItems: { productName: string, quantity: number, price: number }[] = [];
  totalAmount: number = 0;

  // Order details
  name: string = '';
  email: string = '';
  address: string = '';
  mobileNumber: string = '';
  pincode: string = '';
  city: string = '';
  country: string = '';

  constructor(private route: Router, private routes: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.getAllCartItems();
  }

  getAllCartItems() {
    const data = localStorage.getItem("res");
    if (data) {
      const item = JSON.parse(data);
      this.userId = item.id;
    }
    this.api.get(`/cart/userById/${this.userId}`).subscribe((res) => {
      this.cartItems = res.map((item: { productName: string; quantity: number; price: number; }) => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price
      }));
      this.calculateTotalAmount();
    });
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  post() {
    const orderData = {
      name: this.name,
      email: this.email,
      address: this.address,
      mobileNumber: this.mobileNumber,
      pincode: this.pincode,
      totalAmount: this.totalAmount,
      city: this.city,
      country: this.country,
      userId: this.userId,
      orderItem: this.cartItems
    };

    this.api.post('/orders/saves', orderData).subscribe((res) => {
      console.log(res);
      this.route.navigate(['']);
    });
  }
}