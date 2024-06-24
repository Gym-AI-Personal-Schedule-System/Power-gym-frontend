import {NgModule} from "@angular/core";
import {CommissionProcessComponent} from "./commission-process.component";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../shared/shared.module";
import {CommissionProcessRoutingModule} from "./commission-process-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [CommissionProcessComponent],
    imports: [
        CommonModule,
        CommissionProcessRoutingModule,
        sharedModule,
        ReactiveFormsModule,
    ],
  bootstrap: [CommissionProcessComponent],
})
export class CommissionProcessModule{}
