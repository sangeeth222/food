// categorys.component.ts
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/api.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})
export class CategorysComponent implements OnInit {
  formgroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http:ApiService
  ) {}

  ngOnInit(): void {
    this.formgroup = this.formBuilder.group({
      categoryName: ['', Validators.required],
      subcategory: this.formBuilder.array([this.createSubcategory()])
    });
  }
  
  createSubcategory(): FormGroup {
    return this.formBuilder.group({
      subCategoryName: ['', Validators.required]
    });
  }
  
  get subcategory(): FormArray {
    return this.formgroup.get('subcategory') as FormArray;
  }
  
  addSubcategory(): void {
    this.subcategory.push(this.createSubcategory());
  }

  

  submit() {
    if (this.formgroup.valid) {
      const formData = this.formgroup.value;
      this.post(formData);
    } else {
      // Handle form validation errors if needed
    }
  }

  post(data: any) {
    console.log(data);
    this.http.postCategory("category/save", data).subscribe((res: any) => {
      console.log(res);
    }, (error: HttpErrorResponse) => {
      if (error.status === 404) {
        console.error("Error 404: Resource not found. Please check your server configuration.");
      } else {
        console.error("An error occurred:", error.error);
      }
    });
  }
}
