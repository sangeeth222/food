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
  displayedColumns: string[] = ["id", "userName", "mobileno", "gmail", "role", "edit"];

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

  goBack() {
    this.route.navigate(['/admin']);  
  }
}
