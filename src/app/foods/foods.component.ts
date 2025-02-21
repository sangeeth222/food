import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
