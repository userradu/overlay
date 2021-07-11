import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomTreeComponent } from './custom-tree/custom-tree.component';

@Component({
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomControlComponent implements OnInit {

  @ViewChild('searchInputEl') searchInputEl: ElementRef;
  @ViewChild('searchInputElementWrapper') searchInputElementWrapper: ElementRef;

  overlayRef: OverlayRef;
  searchInput = new FormControl();

  isOpen = false;

  constructor(private overlay: Overlay) { }

  ngOnInit(): void { }

  onFocus() {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.searchInputElementWrapper)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
      }]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      width: this.searchInputElementWrapper.nativeElement.offsetWidth,
      hasBackdrop: false
    });

    const customTreePortal = new ComponentPortal(CustomTreeComponent);
    this.overlayRef.attach(customTreePortal);
  }

  onFocusOut() {
    // console.log('on focus out')
    // this.overlayRef.dispose();
    // console.log('overlay', this.overlayRef.overlayElement);
    // console.log('search element', this.searchInputElementWrapper.nativeElement)
  }

  @HostListener('document:click', ['$event'])
  clickout(e: Event) {
    const searchInputElem = this.searchInputElementWrapper?.nativeElement;
    const overlayElem = document.getElementsByClassName('tree-wrapper')[0] as any;

    if (searchInputElem && overlayElem) {
      if (!searchInputElem.contains(e.target) && !overlayElem.contains(e.target)) {
        this.overlayRef.dispose();
      }
    }
  }
}
