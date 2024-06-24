import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddproductRoutingModule } from './addproduct-routing.module';
import { AddproductComponent } from './addproduct.component';
import { sharedModule } from 'src/app/shared/shared.module';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AddproductComponent
  ],
  imports: [
    CommonModule,
    AddproductRoutingModule,
    sharedModule,
    ReactiveFormsModule
  ]
})
export class AddproductModule { }
