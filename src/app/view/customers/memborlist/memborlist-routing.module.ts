import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemborlistComponent } from './memborlist.component';

const routes: Routes = [{ path: '', component: MemborlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemborlistRoutingModule { }
