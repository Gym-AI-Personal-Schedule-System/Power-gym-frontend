import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmemborComponent } from './addmembor.component';

const routes: Routes = [{ path: '', component: AddmemborComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddmemborRoutingModule { }
