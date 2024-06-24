import {RouterModule, Routes} from "@angular/router";
import {CommissionProcessComponent} from "./commission-process.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{ path: '', component: CommissionProcessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionProcessRoutingModule{}
