import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ManageExerciseRoutingModule} from "./manage-exercise-routing.module";
import {ManageExerciseComponent} from "./manage-exercise.component";

@NgModule({
  declarations: [
    ManageExerciseComponent
  ],
  imports: [
    CommonModule,
    ManageExerciseRoutingModule,
    sharedModule,
    ReactiveFormsModule
  ]
})
export class ManageExerciseModule {

}
