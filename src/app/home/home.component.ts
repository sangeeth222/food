import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 

  
  ngOnInit() {
  }


  constructor(private route:Router ) {
    
  }
  fastfood(){
    this.route.navigate(['/food'])
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
