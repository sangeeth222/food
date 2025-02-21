import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Loginentity } from './loginentity';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  showPassword = false;
  error:any;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  constructor( private route:Router,private api:ApiService,private snackbar: SnackbarService) {}
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)])
  })

  get userName() {
    return this.loginForm.get('username');
  }

  get passWord() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    
  }
  loginentity: Loginentity = new Loginentity()
  post() {
    this.loginentity['userName'] = this.loginForm.controls['username'].value?.toString();
    this.loginentity['password'] = this.loginForm.controls['password'].value?.toString();
  
    this.api.post('/user/login', this.loginentity).subscribe(
      (res) => {
        console.log(res);
        window.localStorage.setItem("res", JSON.stringify(res)); 
  
        // Check if res exists and has the role property
        if (res && res.role) {
          if (res.role === "ROLE_ADMIN" ) {
            this.route.navigate(['nav']);
            this.snackbar.showSuccessMessage('Admin Login successfully ' + res.userName ); 
          } else if (res.role === "ROLE_USER" ) {
            this.route.navigate(['']);
            this.snackbar.showSuccessMessage('User Login successfully ' + res.userName ); 
          }
        } else {
          console.error("Response object or role property is null or undefined.");
          // Handle the case where res or res.role is null or undefined
        }
      },
      (error: any) => {
        if (error.status === 401) {
          this.error = error.error;
          console.log(error.error);
        }
      }
    );
  }
  
  res(res: any) {
    throw new Error('Method not implemented.');
  }

signup(){
  this.route.navigate(['signup'])
}
 

  
}