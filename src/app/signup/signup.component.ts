import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';
import { SnackbarService } from 'src/app/snackbar.service';
import { Signupentity } from './signupentity';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  moduledata: string | undefined;
  emailForm: FormGroup | undefined;

  showPassword = false;
  loginForm: any;
  


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  constructor(private api: ApiService, private route: Router, private snackbar: SnackbarService, private fb: FormBuilder) { }
  display = 'none';

  signupForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    number: new FormControl("", [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]+$/)]),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    role: new FormControl("ROLE_USER", [Validators.required]),

  });
  get passWord() {
    return this.signupForm.get('password');
  }
  get mobileNumber() {

    return this.signupForm.get('number');
  }

  get eMail() {
    return this.signupForm.get('email');
  }
  get role() {
    return this.signupForm.get('role');
  }


  displaymodel() {
    this.display = 'block'
  }
  onclose() {
    this.display = 'none'
    // this.route.navigate([''])

  }

  ngOnInit() {
  }
 
  signupentity: Signupentity = new Signupentity()
  post() {
     
    this.signupentity['userName'] = this.signupForm.controls['name'].value?.toString();
    this.signupentity.mobileNo = this.signupForm.controls['number'].value ? +this.signupForm.controls['number'].value : undefined;
    this.signupentity['emailId'] = this.signupForm.controls['email'].value?.toString();
    this.signupentity['password'] = this.signupForm.controls.password.value?.toString();
    this.signupentity['role'] = this.signupForm.controls ['role'].value?.toString();

    this.api.sigPpost(this.signupentity).subscribe((res) => { 
      console.log(res);


      if (res && res.userName) {
        window.localStorage.setItem("res", JSON.stringify(res));

        this.moduledata = `Sign up Successfully ${res.userName}`
 
      }
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
      this.displaymodel();
      const response = res;
      if (response.emailId?.toLowerCase().endsWith("@gmail.com")) {
        return null;
      }
      else {
        return console.log("Invalid Email")
      }
    },
      (error: any) => {
         if (error.status === 401) {
          this.moduledata = error.error;
          this.displaymodel();
          
          console.log(error.error);
        }




      });

  }
  login(){
    this.route.navigate(['login'])
  }

  get userName() {
    return this.loginForm.get('username');
  }
 
}