import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ViewExerciseRoutingModule} from "./view-exercise-routing.module";
import {ViewExerciseComponent} from "./view-exercise.component";

@NgModule({
  declarations: [
    ViewExerciseComponent
  ],
  imports: [
    CommonModule,
    ViewExerciseRoutingModule,
    sharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ViewExerciseModule {

}
