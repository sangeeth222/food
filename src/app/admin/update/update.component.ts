import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/api.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  categoryitem: any[] = [];
   selectedCategory: any;
  subcategories: any[] = [];
  formgroup: FormGroup | undefined;
  formType: string = 'products';  
  selectedImageSrc: string | ArrayBuffer | null = null;  
   products: any[] = [];
  ProductDetails: any;
  
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackbar: SnackbarService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const productId = Number(params['id']); // Ensure it's a valid number
      if ((productId) && productId > 0) {
        this.getProductById(productId);
      } else {
        console.error('Invalid product ID:', params['id']);
        this.snackbar.showErrorMessage('Invalid Product ID');
      }
    });
    this.getCategories();
    this.initializeForm();
  }
  initializeForm() {
    this.formgroup = this.fb.group({
      ProductName: ['', Validators.required],
      CategoryId: ['', Validators.required],
      SubCategoryId: ['', Validators.required],
      Price: ['', Validators.required],
      Quantity: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  update(){
    if(this.formgroup&&this.formgroup.valid){
      const productId=this.activatedRoute.snapshot.params['id'];
      const updatedProduct = {
        productName: this.formgroup.get('ProductName')?.value,
        categoryId: this.formgroup.get('CategoryId')?.value,
        subCategoryId: this.formgroup.get('SubCategoryId')?.value,
        price: this.formgroup.get('Price')?.value,
        quantity: this.formgroup.get('Quantity')?.value
      };
    this.apiService.UpdateProductId(productId,updatedProduct).subscribe((response:any)=>{
      console.log('Product updated successfully:', response);
        this.snackbar.showSuccessMessage('Product updated successfully');
        this.router.navigate(['/admin']);  
      },
      (error) => {
        console.error('Error updating product:', error);
        this.snackbar.showErrorMessage('Failed to update product');  
    })
  }
}
  
  getCategories() {
    this.apiService.get('/category/getall').subscribe((res: any[]) => {
      this.categoryitem = res;
      console.log(res,'-->catego');
      
    });
  }
 
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && this.formgroup) {
      this.formgroup.get('image')?.setValue(file);
      // Display the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImageSrc = e.target!.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateSelectedCategory(event: any) {
    const categoryId = parseInt(event.target.value);
    this.selectedCategory = this.categoryitem.find(category => category.id === categoryId);
    if (this.selectedCategory) {
      this.subcategories = this.selectedCategory.subcategory;
    } else {
      this.subcategories = [];
    }
  }


  getProductById(id: number) {
    this.apiService.getProductById(id).subscribe(
      (response: any) => {
        this.ProductDetails = response;
  
        if (this.formgroup) {
          this.formgroup.patchValue({
            ProductName: response.productName,
            CategoryId: response.categoryId,
            SubCategoryId: response.subCategoryId,
            Price: response.price,
            Quantity: response.quantity
          });
        }
  
        // Populate subcategories based on the selected category
        this.updateSelectedCategory({ target: { value: response.categoryId } });
  
        setTimeout(() => {
          this.formgroup?.patchValue({ SubCategoryId: response.subCategoryId });
        }, 100);
  
        // Set existing image from API
        if (response.imageUrl) {
          this.selectedImageSrc = response.imageUrl; // Ensure this is the correct API image URL
        }
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }
  


  goBack() {
    this.router.navigate(['/admin']);  
  }
}