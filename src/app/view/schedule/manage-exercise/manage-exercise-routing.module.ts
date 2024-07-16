import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManageExerciseComponent} from "./manage-exercise.component";

const routes: Routes = [{ path: '', component: ManageExerciseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageExerciseRoutingModule {

}
