import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.dropdown-active') isActive = false;
  @HostBinding('class.dropdown') true;

  @HostListener('click', ['$event']) onElementClick(e) {
    if (!e.target.closest('.dropdown__content') && this.isActive) {
      this.isActive = false;
      return;
    }

    this.isActive = true;
  }

  @HostListener('document:click', ['$event']) onDocumentClick(e) {
    if (!this.isClickedOnEl(e)) {
      this.isActive = false;
    }
  }

  isClickedOnEl(e) {
    return e.target.closest('.dropdown');
  }

  constructor(private el: ElementRef) {

  }
}
