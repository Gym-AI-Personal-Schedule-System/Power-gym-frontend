import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberlistRoutingModule } from './memberlist-routing.module';
import { MemberlistComponent } from './memberlist.component';


import { sharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MemberlistComponent],
  imports: [CommonModule, MemberlistRoutingModule, sharedModule],
})
export class MemberlistModule {}
