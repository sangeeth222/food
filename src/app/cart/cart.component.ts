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
  inputValue: number = 1;
  imagePaths: { [key: number]: string } = {};

  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    let data = localStorage.getItem("res");
    if (data) {
      let item = JSON.parse(data);
      this.userById = item.id;
    }

    if (this.userById) {
      this.api.get(`/cart/userById/${this.userById}`).subscribe((res: any) => {
        this.addItems = res || [];
        this.addItems.forEach(product => {
          this.loadImage(product.id);
        });
      });
    }
  }

  updateQuantity(index: number, event: Event): void {
    const newQuantity = (event.target as HTMLInputElement).valueAsNumber;
    if (newQuantity > 0) {
      this.addItems[index].quantity = newQuantity;
    }
  }

  totalPrice(item: any): number {
    return item.price * (item.quantity || 1);
  }

  getGrandTotal(): number {
    return this.addItems?.reduce((total, item) => total + this.totalPrice(item), 0) || 0;
  }

  delete(item: any) {
    this.api.delete(`/cart/${item.id}`).subscribe(() => {
      this.getAll();
    });
  }

  buy() {
    this.route.navigate(['buy']);
  }

  getImage(image: string): string {
    return `http://localhost:8080/products/getProductImage/${image}`;
  }

  loadImage(id: number) {
    this.api.get(`/products/getproductDetailsById/${id}`).subscribe(
      (res: any) => {
        if (res?.filePath) {
          this.imagePaths[id] = res.filePath;
        }
      },
      (error) => console.error('Error fetching image:', error)
    );
  }
}
