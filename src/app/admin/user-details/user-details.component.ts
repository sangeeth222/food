import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/api.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit  {
  
  dataSource = new MatTableDataSource<any>();  
  displayedColumns: string[] = ["id", "userName","password", "mobileno", "gmail", "role", "edit",'delete'];
  displayDeleteConfirmation: boolean = false;
  userIdToDelete: number | null = null; // Store product ID for deletion
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: Router, private apiService: ApiService, private snackBar: SnackbarService) {}

  ngOnInit() {
    this.getAllUserDetails();
  }

  getAllUserDetails() {
    this.apiService.getUserDetails().subscribe(
      (res: any) => {
        this.dataSource.data = res;  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error("Error fetching user:", error);
      }
    );
  }

  // view(user: any) {
  //   if (user && user.id) {
  //     this.route.navigate(['admin/view', user.id]);
  //     console.log('Navigating to view:', user.id);
  //   } else {
  //     this.snackBar.showErrorMessage('View not available');
  //   }
  // }

  edit(user: any) {
    if (user && user.id) {
      this.route.navigate(['admin/userdetailsEdit', user.id]);
      console.log('Navigating to update:', user.id);
    } else {
      this.snackBar.showErrorMessage('Edit not available');
    }
  }
delete(id:number){
   this.apiService.deleteUserId(id).subscribe((res:any)=>{
    console.log("user deleted successfully:", res);
    this.snackBar.showSuccessMessage("Successfully deleted", 2000);
this.getAllUserDetails();
   },
  (error)=>{
    console.error("Error deleting user:", error);
    this.snackBar.showErrorMessage("Failed to delete user", 2000);
  });
 }


  // Function to Show delete confirmation
  showDeleteConfirmation(id: number) {
    console.log("Delete confirmation for ID:", id);
    this.userIdToDelete = id;
    this.displayDeleteConfirmation = true;
  }
  // Function to close delete confirmation
  closeDeleteConfirmation() {
    this.displayDeleteConfirmation = false;
    this.userIdToDelete = null;
  }
  // Function to confirm delete
  confirmDelete() {
    if (this.userIdToDelete !== null) {
      this.delete(this.userIdToDelete);
    }
    this.closeDeleteConfirmation();
  }
 

  goBack() {
    this.route.navigate(['/admin']);  
  }
}
