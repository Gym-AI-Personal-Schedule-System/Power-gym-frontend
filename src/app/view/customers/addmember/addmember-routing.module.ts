import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmemberComponent } from './addmember.component';

const routes: Routes = [{ path: '', component: AddmemberComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddmemberRoutingModule { }
