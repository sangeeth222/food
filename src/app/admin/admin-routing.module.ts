import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { UploadComponent } from './upload/upload.component';
import { UpdateComponent } from './update/update.component';
import { CategorysComponent } from './categorys/categorys.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:"",component:NavComponent},
   //{path:"",component:ListComponent},
  {path:"list",component:ListComponent},
  {path:"view/:id",component:ViewComponent},
   {path:"nav",component:NavComponent},
   {path:"login",component:HeaderComponent},
  {path:"upload",component:UploadComponent},
  {path:"update/:id",component:UpdateComponent},
  {path:"categorys",component:CategorysComponent}

   

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
