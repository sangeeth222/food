import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
   userName: any;

  constructor(private route:Router ,private api:ApiService) { 
    this.filteredItems = this.items;
  }

  ngOnInit() {
    
    let data = localStorage.getItem("res");
    if (data) {
      
      let item = JSON.parse(data);
      this.userName = item.userName;
    }

  }

login(){
  this.route.navigate(['login'])
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

