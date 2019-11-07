import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootcampsRoutingModule } from './bootcamps-routing.module';
import { BootcampsComponent } from './bootcamps/bootcamps.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [BootcampsComponent],
  imports: [
    CommonModule,
    SharedModule,
    BootcampsRoutingModule
  ]
})
export class BootcampsModule {
}
