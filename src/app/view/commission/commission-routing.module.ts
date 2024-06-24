import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommissionComponent} from "./commission.component";

const routes: Routes = [
  {
    path: '',
    component: CommissionComponent,
    children: [
      {
        path: 'commission-process',
        loadChildren: () =>
          import('./commission-process/commission-process.module').then((m) => m.CommissionProcessModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionRoutingModule{}
