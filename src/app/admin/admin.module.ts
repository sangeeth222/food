import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
 import { UploadComponent } from './upload/upload.component';
import { UpdateComponent } from './update/update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategorysComponent } from './categorys/categorys.component';
import { ListComponent } from './list/list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ViewComponent } from './view/view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailsEditComponent } from './user-details-edit/user-details-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';


@NgModule({
  declarations: [
     UploadComponent,
    UpdateComponent,
    CategorysComponent,
    ListComponent,
    ViewComponent,
    UserDetailsComponent,
    UserDetailsEditComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,   
    MatSortModule,
    MatDialogModule
    
    
  ]
})
export class AdminModule { }
