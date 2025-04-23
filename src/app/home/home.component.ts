import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoryDessertItem:any[]=[];
  selectedState: string = '';  
  selectedCity: string = '';  
  email: string = '';
  cityList: string[] = [];
  ngOnInit() {}
  constructor(private route: Router, private api: ApiService ) {  }
  stateList: { id: number, name: string }[] = [
    { id: 23, name: 'Tamil Nadu' }
    
  ];
  cityMap: { [key: string]: string[] } = {
      'Tamil Nadu': [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode', 'Vellore', 'Tirunelveli', 'Thoothukudi', 'Dindigul',
      'Thanjavur', 'Tiruvannamalai', 'Kanchipuram', 'Karur', 'Namakkal', 'Perambalur', 'Sivaganga', 'Tiruvarur', 'Pudukkottai', 'Cuddalore',
      'Dharmapuri', 'Krishnagiri', 'Nagapattinam', 'Nagercoil', 'Ranipet', 'Theni', 'Villupuram', 'Virudhunagar', 'Ariyalur', 'Mayiladuthurai'],
   };
  onStateChange() {
    this.cityList = this.cityMap[this.selectedState] || [];
    this.selectedCity = '';
  }
  fastfood(){
    this.route.navigate(['/food'])
  }
  getall() {
    this.api.get('/category/getall').subscribe((res) => {
      console.log(res);
      this.categoryDessertItem = res.DESSERTS;
    });
  }
about() {
  this.route.navigate(['about'])
}
contact() {
  this.route.navigate(['contact'])
  }
  career() {
    this.route.navigate(['career'])
  }
}