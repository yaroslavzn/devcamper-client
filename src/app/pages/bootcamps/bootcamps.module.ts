import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootcampsRoutingModule } from './bootcamps-routing.module';
import { BootcampsComponent } from './bootcamps/bootcamps.component';
import { SharedModule } from '../../shared/shared.module';
import { BootcampComponent } from './bootcamp/bootcamp.component';


@NgModule({
  declarations: [BootcampsComponent, BootcampComponent],
  imports: [
    CommonModule,
    SharedModule,
    BootcampsRoutingModule
  ]
})
export class BootcampsModule {
}
