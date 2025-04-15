import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ["id", "categoryName", "subcategory", "edit", "delete"];
  displayDeleteConfirmation: boolean = false;
  userIdToDelete: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  categoryitem: any[] | undefined;

  constructor(private route: Router, private apiService: ApiService, private snackBar: SnackbarService) {}

  ngOnInit() {
    this.getAllCategories();
    console.log(this.getAllCategories,"-->");
   // this.getCategories();
  }
    
  // getCategories() {
  //   this.apiService.get('/category/getall').subscribe((res: any[]) => {
  //     this.categoryitem = res;
  //     console.log(res);
      
  //   });
  // }

  getAllCategories() {
    this.apiService.getCategories().subscribe(
      (res: any) => {
        this.dataSource.data = res;
        console.log   (this.dataSource.data,'this.dataSource.data'),
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error("Error fetching categories:", error);
      }
    );
  }

  edit(category: any) {
    if (category && category.id) {
      this.route.navigate(['admin/categoryEdit', category.id]);
      console.log('Navigating to update:', category.id);
    } else {
      this.snackBar.showErrorMessage('Edit not available');
    }
  }

  delete(id: number) {
    this.apiService.DeleteCategory(id).subscribe(
      (res: any) => {
        console.log("Category deleted successfully:", res);
        this.snackBar.showSuccessMessage("Successfully deleted", 2000);
        this.getAllCategories();
        this.route.navigateByUrl('/admin/categoryList');
       },
      (error) => {
        console.error("Error deleting category:", error);
        this.snackBar.showErrorMessage("Failed to delete category", 2000);
      }
    );
  }

  showDeleteConfirmation(id: number) {
    console.log("Delete confirmation for ID:", id);
    this.userIdToDelete = id;
    this.displayDeleteConfirmation = true;
  }

  closeDeleteConfirmation() {
    this.displayDeleteConfirmation = false;
    this.userIdToDelete = null;
  }

  confirmDelete() {
    if (this.userIdToDelete !== null) {
      this.delete(this.userIdToDelete);
    }
    this.closeDeleteConfirmation();
  }

  goBack() {
    this.route.navigate(['/admin']);
  }

  categorys() {
    this.route.navigate(['admin/categorys']);
  }
}
