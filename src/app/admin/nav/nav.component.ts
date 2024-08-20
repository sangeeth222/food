import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {



  nonveg: any[] = [];
  categoryitem:any[]=[];
  // userById: any[]=[];
  userName: any;

  constructor(private route:Router ,private api:ApiService) { 
    this.filteredItems = this.items;
  }

  ngOnInit() {
    this.getall();
    let data = localStorage.getItem("res");


    if (data) {
      
      let item = JSON.parse(data);
      this.userName = item.userName;
    }
    


  }

food(){
  this.route.navigate(['food'])
}

login(){
  this.route.navigate(['login'])
}

home(){
  this.route.navigate([''])
}
cart(){
  this.route.navigate(['cart'])
}

gets(){
  this.route.navigate(['food'])
}
upload() {
  this.route.navigate(['nav','upload'])
  }
  update() {
    this.route.navigate(['nav','update'])
   }
   
   categorys() {
this.route.navigate(['nav','categorys'])    }

getall(){
  this.api.get('/category/getall').subscribe((res: any[]) => {
    console.log(res);
    this.categoryitem=res;
    
})
}

logout(){
  localStorage.removeItem("res");
  this.userName= null;
  this.route.navigate(['login'])
}
items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
searchTerm: string = '';
filteredItems: string[] = [];
filterItems(): void {
  this.filteredItems = this.items.filter(item =>
    item.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
}

