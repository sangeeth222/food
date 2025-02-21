import { Component, OnInit } from '@angular/core';
 import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
 import { ActivatedRoute, Router } from '@angular/router';
 import { ApiService } from 'src/api.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
   userById:any;
  category: String;
  veg: any;
  userId: any;

  constructor(private api: ApiService, private route: Router, public dialog: MatDialog,private snackbar: SnackbarService,private routes: ActivatedRoute) {
    this.category = this.routes.snapshot.queryParams['id'];

  }
  nonveg: any[] = [];

  ngOnInit() {
    this.gets();

    let data = localStorage.getItem("res");

    if (data) {
      console.log(JSON.parse(data));
      let item = JSON.parse(data);
      this.userId = item.id;
    }


  }

  getImage(image: String): String {
     
    return `http://localhost:8080/products/getProductImage/${image}`;
}

 


  gets() {
    this.api.get('/products/getByCategory/' + this.category).subscribe((res) => {
      console.log("success");

      this.nonveg = res;
      this.veg = res;
      console.log(this.nonveg);

    })
  }
  
  post(data: any) {

    if(this.userId){

  
    console.log(data);
    let payload: any = {};
    payload['productName'] = data.productName;
    payload['quantity'] = 1; 
    payload['price'] = data.price;
    payload['image'] = data.image;
    payload['user'] = {
      "id": this.userId
    }; 
    payload['productId'] = data.id;



    this.api.post("/cart", payload).subscribe((res) => {
      this.snackbar.showSuccessMessage(res.message);


    });
  }else{
    this.route.navigate(['login'])
  }
  }


getall(){
  let data = localStorage.getItem("res");
  if (data) {
    console.log(JSON.parse(data));
    let item = JSON.parse(data);
    this.userById = item.id;

  }    this.api.get('/cart/userById/'+this.userById).subscribe((res)=>{
    console.log(res);
    this.nonveg=res;
    
    

  })
}
buy(){
  this.route.navigate(['cart'])
}
}
   userId: any;
  nonveg: any[] = [];
  imagePaths: { [key: number]: string } = {};
  category: any;

  constructor(
    private api: ApiService,
    private route: Router,
    private routes: ActivatedRoute,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    // Subscribe to query parameters to react to changes
    this.routes.queryParams.subscribe(params => {
      this.category = params['id'];
      console.log(this.category, "<========");
      this.getProductsByCategory(); // Fetch products when category changes
    });

    // Get user ID from local storage
    let data = localStorage.getItem("res");
    if (data) {
      let item = JSON.parse(data);
      this.userId = item.id;
    }
  }

  getProductsByCategory() {
    this.api.get('/products/getByCategory/' + this.category).subscribe((res) => {
      console.log("Fetched products successfully");
      this.nonveg = res;

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
      let payload: any = {
        productName: data.productName,
        quantity: 1,
        price: data.price,
        image: this.imagePaths[data.id], // Use the imagePaths for the correct image
        user: { id: this.userId },
        productId: data.id
      };

      this.api.post("/cart", payload).subscribe((res) => {
        this.snackbar.showSuccessMessage(res.message);
      });
    } else {
      this.route.navigate(['login']);
    }
  }

  buy() {
    this.route.navigate(['buy']);
  }

  loadImage() {
    console.log("Image Loaded Success");
  }
}
 