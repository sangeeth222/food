import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from 'src/header/header.component';
import { UploadComponent } from './upload/upload.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path:"",component:NavComponent},
  {path:"login",component:HeaderComponent},
  {path:"upload",component:UploadComponent},
  {path:"update",component:UpdateComponent}

   

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
