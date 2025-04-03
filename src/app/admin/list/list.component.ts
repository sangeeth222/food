import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

displayedColumns: string[] = ['id', 'productName', 'category', 'subCategory', 'price', 'quantity','view','edit','delete'];
  dataSource=new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  products: any;
editEnable: any;
viewEnable: any;
  toastrMsg: any;
  userName: any;
displayDeleteConfirmation: boolean = false;
productIdToDelete: number | null = null; // Store product ID for deletion


  constructor(private route:Router,private apiService: ApiService,private snackBar:SnackbarService){
    this.filteredItems = this.items;

  }
  ngOnInit(){
    let data = localStorage.getItem("res");
    if (data) {
      
      let item = JSON.parse(data);
      this.userName = item.userName;
    }

    this.getAllProducts();
   }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
login(){
  this.route.navigate(['login'])
}

 

logout(){
  localStorage.removeItem("res");
  this.userName= null;
  this.route.navigate(['login'])
}
items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
searchTerm: string = '';
filteredItems: string[] = [];
filterItems(): void {
  this.filteredItems = this.items.filter(item =>
    item.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}


  getAllProducts() {
    this.apiService.getAllProduct().subscribe(
      (res: any) => {
         this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }
  

  view(product: any) {
    if (product && product.id) {
      this.route.navigate(['admin/view', product.id]);
      console.log('Navigating to view:', product.id);
      
    } else {
      this.toastrMsg.error('View not available');
    }
  }

  edit(product: any) {
    if (product && product.id) {
      this.route.navigate(['admin/update', product.id]); // Corrected navigation
      console.log('Navigating to update:', product.id);
    } else {
      this.snackBar.showErrorMessage('Edit not available');
    }
  }
  delete(id: number) {
    console.log("Deleting product with ID:", id);

    this.apiService.DeleteProduct(id).subscribe(
      (response: any) => {
        console.log("Product deleted successfully:", response);
        this.snackBar.showSuccessMessage("Successfully deleted", 2000);
        this.getAllProducts(); // Refresh product list
      },
      (error) => {
        console.error("Error deleting product:", error);
        this.snackBar.showErrorMessage("Failed to delete product", 2000);
      }
    );
  }
  
categorys() {
  this.route.navigate(['admin/categorys']);
 }

 upload() {
  this.route.navigate(['admin/upload'])
  }
  update() {
    this.route.navigate(['admin/update'])
   }
   userdetails(){
    console.log(' working click');
    
    this.route.navigate(['admin/userdetails']);
    console.log("sucess route");
    
   }
 
  // Function to Show delete confirmation
   showDeleteConfirmation(id: number) {
    console.log("Delete confirmation for ID:", id);
    this.productIdToDelete = id;
    this.displayDeleteConfirmation = true;
  }
  // Function to close delete confirmation
  closeDeleteConfirmation() {
    this.displayDeleteConfirmation = false;
    this.productIdToDelete = null;
  }
  // Function to confirm delete
  confirmDelete() {
    if (this.productIdToDelete !== null) {
      this.delete(this.productIdToDelete);
    }
    this.closeDeleteConfirmation();
  }

}

