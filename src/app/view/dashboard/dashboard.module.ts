import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { FeatherModule } from 'angular-feather';
import { sharedModule } from 'src/app/shared/shared.index';
import {NgChartsModule} from "ng2-charts";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    sharedModule,
    NgChartsModule
  ],
  exports: [FeatherModule],
})
export class DashboardModule {}
