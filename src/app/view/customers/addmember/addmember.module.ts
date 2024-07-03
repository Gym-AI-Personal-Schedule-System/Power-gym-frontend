import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddmemberRoutingModule } from './addmember-routing.module';
import { AddmemberComponent } from './addmember.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    AddmemberComponent
  ],
  imports: [

    ReactiveFormsModule,
    CommonModule,
    AddmemberRoutingModule,
    NgSelectModule,

  ]
})
export class AddmemberModule { }
