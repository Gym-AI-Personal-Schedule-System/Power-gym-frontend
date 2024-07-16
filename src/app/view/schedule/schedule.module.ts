import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleRoutingModule} from "./schedule-routing.module";
import {ScheduleComponent} from "./schedule.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ScheduleModule {
}
