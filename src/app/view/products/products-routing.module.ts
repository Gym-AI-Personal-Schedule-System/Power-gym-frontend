import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products.component";

const routes: Routes = [
  { path: '', redirectTo: 'productlist', pathMatch: 'full' },
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'add-product',
        loadChildren: () =>
          import('./addproduct/addproduct.module').then(
            (m) => m.AddproductModule
          ),
      },


    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
