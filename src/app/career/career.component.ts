import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
 
export class CareerComponent {
  constructor(private rou:Router){} 
  
  goback() {
    this.rou.navigate(['']);
  
    }

refreshPage() {
  window.location.reload();
}
}
