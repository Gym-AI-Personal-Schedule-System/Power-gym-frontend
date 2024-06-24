import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers.component";

const routes: Routes = [
  { path: '', redirectTo: 'customer-list', pathMatch: 'full' },
  {
    path: '',
    component: CustomersComponent,
    children: [
      {
        path: 'customer-list',
        loadChildren: () =>
          import('./memborlist/memborlist.module').then(
            (m) => m.MemborlistModule
          ),
      },
      {
        path: 'add-customer',
        loadChildren: () =>
          import('./addmembor/addmembor.module').then(
            (m) => m.AddmemborModule
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
