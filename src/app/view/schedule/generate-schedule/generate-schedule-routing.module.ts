import {RouterModule, Routes} from "@angular/router";
import {GenerateScheduleComponent} from "./generate-schedule.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{ path: '', component: GenerateScheduleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateScheduleRoutingModule{

}
