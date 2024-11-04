import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/api.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  id: any;
  data: any;
  
 
  buy: any;
  userId: any;
  cartItems: { productName: string, quality: string, price: number }[] = [];
  inputValue: number = 1;
  total: any;
  addItems: any;

  
  // ordercode
  name: any;
  email: any;
  address: any;
  mobileNumber: any;
  pincode: any;
  totalAmount: any;
  userById: string | undefined;
  city: any;
  country: any;
  imagePaths: any;
  
  


  
  
  constructor(private route: Router, private routes: ActivatedRoute, private api: ApiService) {
    this.id = this.routes.snapshot.queryParams['id'];
  }

  ngOnInit() {
    this.getall()

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

cart(){
  this.route.navigate(['cart'])
  
}


post(){
  let data:any={}
    data['name']=this.name;
    data['email']=this.email;
    data['address']=this.address;
    data['mobileNumber']=this.mobileNumber;
    data['pincode']=this.pincode;
    data['totalAmount']=this.getGrandTotal();
    data['city']=this.city;
    data['country']=this.country;
    data['userId'] = this.userById;
    data['orderItem'] = this.cartItems;
  this.api.post('/orders/saves',data).subscribe((res) => {
    console.log(res);
    this.route.navigate(['']);
    
})
   

    
  ;
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
    // Transform the array
    this.cartItems = res.map((item: { productName: any; quantity: any; price: any; }) => {
     this.totalPrice(item);

      return {
        productName: item.productName,
        quantity  : item.quantity,
        price: item.price

      };
    });
  });
}
totalPrice(item: any) {
  this.totalAmount = item.price * item.quantity
  return item.price * item.quantity; 
}
getGrandTotal(): number {
  let grandTotal = 0;

  for (let item of this.addItems) {
    grandTotal += this.totalPrice(item);
  }

  return grandTotal;
}

}
