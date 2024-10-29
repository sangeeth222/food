import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/api.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  userById: any;
  category: String;
  veg: any;
  userId: any;
  nonveg: any[] = [];
  imagePaths: { [key: number]: string } = {};

  constructor(private api: ApiService, private route: Router, public dialog: MatDialog, private snackbar: SnackbarService, private routes: ActivatedRoute) {
    this.category = this.routes.snapshot.queryParams['id'];
  }

  ngOnInit() {
    this.gets();

    let data = localStorage.getItem("res");
    if (data) {
      let item = JSON.parse(data);
      this.userId = item.id;
    }
  }

  gets() {
    this.api.get('/products/getByCategory/' + this.category).subscribe((res) => {
      console.log("success");
      this.nonveg = res;
      this.veg = res;
      console.log(this.nonveg);

      // Fetch image paths for each product
      this.nonveg.forEach(product => {
        this.getImage(product.id);
      });
    });
  }

  getImage(id: number) {
    this.api.get('/products/getproductDetailsById/' + id).subscribe(
      (res) => {
        this.imagePaths[id] = res.filePath; // Store the image path in the imagePaths object
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }

  post(data: any) {
    if (this.userId) {
      let payload: any = {};
      payload['productName'] = data.productName;
      payload['quantity'] = 1;
      payload['price'] = data.price;
      payload['image'] = data.image; // You might want to update this to use the imagePaths
      payload['user'] = {
        "id": this.userId
      };
      payload['productId'] = data.id;

      this.api.post("/cart", payload).subscribe((res) => {
        this.snackbar.showSuccessMessage(res.message);
      });
    } else {
      this.route.navigate(['login']);
    }
  }

  buy() {
    this.route.navigate(['cart']);
  }

  loadImage() {
    console.log("Image Loaded Success");
  }
}
