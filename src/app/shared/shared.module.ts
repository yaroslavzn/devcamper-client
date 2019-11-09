import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { DropdownDirective } from '../directives/dropdown.directive';


@NgModule({
  declarations: [HeaderComponent, MainLayoutComponent, SpinnerComponent, DropdownDirective],
  exports: [
    HeaderComponent,
    MainLayoutComponent,
    SpinnerComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
