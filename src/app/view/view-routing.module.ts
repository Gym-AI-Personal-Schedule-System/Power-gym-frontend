import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ViewComponent} from "./view.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: ViewComponent,
    children: [
      {
        path: 'product',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./customers/customers.module').then((m) => m.CustomersModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule { }
