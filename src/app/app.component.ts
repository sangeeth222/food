import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private route:Router ) {
    
  }
   
about() {
  this.route.navigate(['about'])
}
contact() {
  this.route.navigate(['contact'])
  }
  
  title = 'vinusha';
}
