import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { BootcampsComponent } from './bootcamps/bootcamps.component';
import { BootcampComponent } from './bootcamp/bootcamp.component';
import { AuthGuard } from '../../guards/auth.guard';


const routes: Routes = [
  {
    path: 'bootcamps',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: BootcampsComponent
      },
      {
        path: ':slug',
        component: BootcampComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootcampsRoutingModule {
}
