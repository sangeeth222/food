  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { ApiService } from 'src/api.service';

  @Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
  })
  export class CartComponent implements OnInit {
    userById: any;
    addItems: any[] = [];
    item: any;
    inputValue: number = 1;
    total: any;

    updateQuantity(index: number, event: Event): void {
      const newQuantity = (event.target as HTMLInputElement).valueAsNumber;
      this.addItems[index].quantity = newQuantity; // Fix typo in property name (quentity -> quantity)
    }

    totalPrice(item: any): number {
      return item.price * item.quantity; 
    }

    CalculateTotal(event: any): void {
      const inputValue: any = (event.target as HTMLInputElement).value;
      console.log(inputValue);
    
    }

    constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) {}

    ngOnInit() {
      this.getall();
    }

    getall() {
      let data = localStorage.getItem("res");
      if (data) {
        console.log(JSON.parse(data));
        let item = JSON.parse(data);
        this.userById = item.id;
      }
      this.api.get('/cart/userById/' + this.userById).subscribe((res) => {
        console.log(res);
        this.addItems = res;
      });
    }

    
    getImage(image: String): String {
      
      return `http://localhost:8080/products/getProductImage/${image}`;
  }

    delete(item: any) {
      this.api.delete('/cart/' + item.id).subscribe((res) => {
        console.log(item);
        this.getall();
      });
    }

    getGrandTotal(): number {
      let grandTotal = 0;

      for (let item of this.addItems) {
        grandTotal += this.totalPrice(item);
      }

      return grandTotal;
    }

    calculateTotal(): void {
      
    }

    buy() {
      this.route.navigate(['buy']);
    }
  }
