import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/api.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.css']
})
export class UserDetailsEditComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const userId = Number(params["id"]); // Convert param to number
      if (userId && userId > 0) {
        this.userId = userId; // Assign userId to class property
        this.getUserDetails(userId);
      } else {
        console.error('Invalid User ID:', params['id']);
        this.snackBar.showErrorMessage('Invalid User ID');
      }
    });

    this.initializeForm();
  }

  initializeForm() {
    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      emailId: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  getUserDetails(userId: number) {
    this.apiService.getUserById(userId).subscribe(
      (user: any) => {
        this.userForm.patchValue(user);
      },
      (error) => {
        console.error('Error fetching user details:', error);
        this.snackBar.showErrorMessage('Failed to load user details');
      }
    );
  }

  updateUser() {
    if (this.userForm.valid) {
      const requestPayload = this.userForm.getRawValue(); // Get all form values including disabled fields
      requestPayload.id = this.userId; // Ensure ID is correctly assigned

      this.apiService.updateUserId(this.userId, requestPayload).subscribe(
        (res) => {
          this.snackBar.showSuccessMessage('User updated successfully');
          this.router.navigate(['/admin/userdetails']); // Redirect after update
        },
        (error) => {
          console.error('Error updating user:', error);
          this.snackBar.showErrorMessage('Failed to update user');
        }
      );
    } else {
      this.snackBar.showErrorMessage('Please fill all required fields correctly');
    }
  }
  

  goBack() {
    this.router.navigate(['/admin/userdetails']); // Navigate back
  }
}
