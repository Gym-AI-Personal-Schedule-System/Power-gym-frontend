import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AddExerciseRoutingModule} from "./add-exercise-routing.module";
import {AddExerciseComponent} from "./add-exercise.component";

@NgModule({
  declarations: [
    AddExerciseComponent
  ],
  imports: [
    CommonModule,
    AddExerciseRoutingModule,
    sharedModule,
    ReactiveFormsModule
  ]
})
export class AddExerciseModule {

}
