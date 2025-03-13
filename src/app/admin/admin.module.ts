import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './nav/nav.component';
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


@NgModule({
  declarations: [
    NavComponent,
    UploadComponent,
    UpdateComponent,
    CategorysComponent,
    ListComponent,
    ViewComponent
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
