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
    { id: 1, name: 'Andhra Pradesh' },
    { id: 2, name: 'Arunachal Pradesh' },
    { id: 3, name: 'Assam' },
    { id: 4, name: 'Bihar' },
    { id: 5, name: 'Chhattisgarh' },
    { id: 6, name: 'Goa' },
    { id: 7, name: 'Gujarat' },
    { id: 8, name: 'Haryana' },
    { id: 9, name: 'Himachal Pradesh' },
    { id: 10, name: 'Jharkhand' },
    { id: 11, name: 'Karnataka' },
    { id: 12, name: 'Kerala' },
    { id: 13, name: 'Madhya Pradesh' },
    { id: 14, name: 'Maharashtra' },
    { id: 15, name: 'Manipur' },
    { id: 16, name: 'Meghalaya' },
    { id: 17, name: 'Mizoram' },
    { id: 18, name: 'Nagaland' },
    { id: 19, name: 'Odisha' },
    { id: 20, name: 'Punjab' },
    { id: 21, name: 'Rajasthan' },
    { id: 22, name: 'Sikkim' },
    { id: 23, name: 'Tamil Nadu' },
    { id: 24, name: 'Telangana' },
    { id: 25, name: 'Tripura' },
    { id: 26, name: 'Uttar Pradesh' },
    { id: 27, name: 'Uttarakhand' },
    { id: 28, name: 'West Bengal' }
  ];
  cityMap: { [key: string]: string[] } = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Kakinada', 'Rajahmundry', 'Tirupati', 'Anantapur', 'Eluru'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli', 'Belagavi', 'Mangaluru', 'Davanagere', 'Ballari', 'Shivamogga', 'Tumakuru', 'Bidar'],
    'Kerala': [
      'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur', 'Palakkad', 'Alappuzha', 'Kottayam', 'Malappuram', 'Pathanamthitta',
      'Kannur', 'Idukki', 'Kasargod', 'Wayanad', 'Varkala', 'Munnar', 'Guruvayur'],
    'Tamil Nadu': [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode', 'Vellore', 'Tirunelveli', 'Thoothukudi', 'Dindigul',
      'Thanjavur', 'Tiruvannamalai', 'Kanchipuram', 'Karur', 'Namakkal', 'Perambalur', 'Sivaganga', 'Tiruvarur', 'Pudukkottai', 'Cuddalore',
      'Dharmapuri', 'Krishnagiri', 'Nagapattinam', 'Nagercoil', 'Ranipet', 'Theni', 'Villupuram', 'Virudhunagar', 'Ariyalur', 'Mayiladuthurai'],
    'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Canacona', 'Bicholim', 'Valpoi', 'Curchorem'],
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