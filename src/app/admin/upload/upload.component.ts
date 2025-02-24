import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
 
  categoryitem: any[] = [];
  selectedCategory: any;
  subcategories: any[] = [];

  formgroup: FormGroup | undefined;
  formType: string = 'products';  
  selectedImageSrc: string | ArrayBuffer | null = null;  

  constructor(private fb: FormBuilder, private apiService: ApiService,private router:Router) { }

  ngOnInit() {
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

  register() {
    if (this.formgroup && this.formgroup.valid) {
      const formData = new FormData();
      formData.append('productName', this.formgroup.get('ProductName')?.value);
      formData.append('categoryIdStr', this.formgroup.get('CategoryId')?.value);
      formData.append('subcategoryIdStr', this.formgroup.get('SubCategoryId')?.value);
      formData.append('price', this.formgroup.get('Price')?.value);
      formData.append('quantity', this.formgroup.get('Quantity')?.value);
      formData.append('image', this.formgroup.get('image')?.value);
  
      if (this.formType === 'products') {
        this.apiService.postProduct(formData).subscribe(
          (response: any) => {
            console.log('Form data uploaded successfully:', response);
          },
          (error: any) => {
            console.error('Error uploading form data:', error);
            if (error.error) {
              console.error('Error Response:', error.error);
            }
          }
        );
      }
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

  goBack() {
    this.router.navigate(['/nav']); // ✅ Navigate back to the list page
  }
}
