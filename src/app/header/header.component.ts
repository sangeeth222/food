import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categoryitem: any[] = [];
  userName: any;
  displayLogoutConfirmation: boolean = false;  

  constructor(private route: Router, private api: ApiService) {}

  ngOnInit() {
    this.getall();
    let data = localStorage.getItem("res");
    if (data) {
      let item = JSON.parse(data);
      this.userName = item.userName;
    }
  }

  navigateToFood(id: number) {
    this.route.navigate(['/food'], { queryParams: { id: id } });
    console.log("Navigated to food with id:", id);
  }

  signup() {
    this.route.navigate(['sign']);
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

  getall() {
    this.api.get('/category/getall').subscribe((res) => {
      console.log(res);
      this.categoryitem = res;
    });
  }

  // Logout confirmation methods...
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