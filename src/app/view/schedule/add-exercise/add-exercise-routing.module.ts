import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddExerciseComponent} from "./add-exercise.component";

const routes: Routes = [{ path: '', component: AddExerciseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddExerciseRoutingModule {

}
