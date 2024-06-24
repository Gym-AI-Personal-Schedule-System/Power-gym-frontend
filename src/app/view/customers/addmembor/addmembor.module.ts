import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddmemborRoutingModule } from './addmembor-routing.module';
import { AddmemborComponent } from './addmembor.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    AddmemborComponent
  ],
  imports: [

    ReactiveFormsModule,
    CommonModule,
    AddmemborRoutingModule,
    NgSelectModule,

  ]
})
export class AddmemborModule { }
