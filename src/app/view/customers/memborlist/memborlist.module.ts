import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemborlistRoutingModule } from './memborlist-routing.module';
import { MemborlistComponent } from './memborlist.component';


import { sharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MemborlistComponent],
  imports: [CommonModule, MemborlistRoutingModule, sharedModule],
})
export class MemborlistModule {}
