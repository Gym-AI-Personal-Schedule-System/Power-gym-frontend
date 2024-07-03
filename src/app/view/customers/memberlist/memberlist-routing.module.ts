import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberlistComponent } from './memberlist.component';

const routes: Routes = [{ path: '', component: MemberlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberlistRoutingModule { }
