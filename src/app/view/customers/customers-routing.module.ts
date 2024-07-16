import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers.component";

const routes: Routes = [
  { path: '', redirectTo: 'member', pathMatch: 'full' },
  {
    path: '',
    component: CustomersComponent,
    children: [
      {
        path: 'member-list',
        loadChildren: () =>
          import('./memberlist/memberlist.module').then(
            (m) => m.MemberlistModule
          ),
      },
      {
        path: 'add-member',
        loadChildren: () =>
          import('./addmember/addmember.module').then(
            (m) => m.AddmemberModule
          ),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
