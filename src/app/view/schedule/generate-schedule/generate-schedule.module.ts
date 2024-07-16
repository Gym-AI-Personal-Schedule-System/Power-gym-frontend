import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {GenerateScheduleComponent} from "./generate-schedule.component";
import {GenerateScheduleRoutingModule} from "./generate-schedule-routing.module";

@NgModule({
  declarations: [
    GenerateScheduleComponent
  ],
  imports: [
    CommonModule,
    GenerateScheduleRoutingModule,
    sharedModule,
    ReactiveFormsModule
  ]
})
export class GenerateScheduleModule{

}
