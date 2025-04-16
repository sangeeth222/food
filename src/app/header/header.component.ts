import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nonveg: any[] = [];
  categoryitem: any[] = [];
  userName: any;
  displayLogoutConfirmation: boolean = false;
  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  searchTerm: string = '';
  filteredItems: string[] = [];
  constructor(private route: Router, private api: ApiService) {
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
 
  food() {
    this.route.navigate(['food']);
  }
 
  login() {
    this.route.navigate(['login']);
  }
 
  home() {
    this.route.navigate(['']);
  }
 
  cart() {
    this.route.navigate(['cart']);
  }
 
  gets() {
    this.route.navigate(['food']);
  }
 
  getall() {
    this.api.get('/category/getall').subscribe((res) => {
      console.log(res);
      this.categoryitem = res;
      this.filteredItems = res;
    });
  }
  
 
  logout() {
    localStorage.removeItem("res");
    this.userName = null;
    this.route.navigate(['login']);
  }
 
  navigateToFood(id: number) {
    this.route.navigate(['/food'], { queryParams: { id: id } });
    console.log("Navigated to food with id:", id);
  }
 
  signup() {
    this.route.navigate(['sign']);
  }
 
  filterItems(): any {
    this.filteredItems = this.items.filter(item =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  // Logout confirmation methods
  showLogoutConfirmation() {
    this.displayLogoutConfirmation = true;
  }
 
  closeLogoutConfirmation() {
    this.displayLogoutConfirmation = false;
  }
 
  confirmLogout() {
    localStorage.removeItem("res");
    this.userName = null;
    this.route.navigate(['login']);
    this.closeLogoutConfirmation();
  }
}
 