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
  imagePaths: { [key: number]: string } = {};

  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) {}

  ngOnInit() {
    this.getall();
  }

  getall() {
    const data = localStorage.getItem("res");
    if (data) {
      const item = JSON.parse(data);
      this.userById = item.id;
    }
    this.api.get('/cart/userById/' + this.userById).subscribe((res) => {
      this.addItems = res;
      this.addItems.forEach(product => {
        this.getImage(product.id);
      });
    });
  }

  getImage(id: number) {
    this.api.get('/products/getproductDetailsById/' + id).subscribe(
      (res) => {
        this.imagePaths[id] = res.filePath;
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }

  updateQuantity(index: number, event: Event): void {
    const newQuantity = ( event.target as HTMLInputElement).valueAsNumber;
    this.addItems[index].quantity = newQuantity;
  }

  totalPrice(item: any): number {
    return item.price * item.quantity;
  }

  delete(item: any) {
    this.api.delete('/cart/' + item.id).subscribe(() => {
      this.getall();
    });
  }

  getGrandTotal(): number {
    return this.addItems.reduce((total, item) => total + this.totalPrice(item), 0);
  }

  buy() {
    this.route.navigate(['buy']);
  }
}