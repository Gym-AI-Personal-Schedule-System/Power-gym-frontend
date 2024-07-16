import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ViewExerciseComponent} from "./view-exercise.component";

const routes: Routes = [{ path: '', component: ViewExerciseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewExerciseRoutingModule {

}
