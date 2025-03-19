import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { HeaderComponent } from 'src/app/header/header.component';
import { UploadComponent } from './upload/upload.component';
import { UpdateComponent } from './update/update.component';
import { CategorysComponent } from './categorys/categorys.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailsEditComponent } from './user-details-edit/user-details-edit.component';

const routes: Routes = [
    {path:"",component:ListComponent},
  {path:"list",component:ListComponent},
  {path:"view/:id",component:ViewComponent},
    {path:"login",component:HeaderComponent},
  {path:"upload",component:UploadComponent},
  {path:"update/:id",component:UpdateComponent},
  {path:"categorys",component:CategorysComponent},
  {path:'userdetails',component:UserDetailsComponent},
  {path: 'userdetailsEdit/:id',component:UserDetailsEditComponent}

   

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
