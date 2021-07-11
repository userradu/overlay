import { FocusMonitor } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { merge, Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-applications-selector',
  templateUrl: './applications-selector.component.html',
  styleUrls: ['./applications-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApplicationsSelectorComponent implements OnInit {

  @ViewChild(MatInput, { read: ElementRef, static: true })
  private inputEl: ElementRef;

  @ViewChild(CdkConnectedOverlay, { static: true })
  private connectedOverlay: CdkConnectedOverlay;

  applications: string[];
  selectedApplication: string;

  showPanel$: Observable<boolean>;
  searchInputControl = new FormControl();

  positions: ConnectedPosition[] = [
    {
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
    },
  ];

  private isPanelVisible$: Observable<boolean>;
  private isPanelHidden$: Observable<boolean>;

  constructor(
    private focusMonitor: FocusMonitor,
  ) { }

  ngOnInit(): void {
    this.createApplications();

    this.isPanelHidden$ = merge(
      this.connectedOverlay.detach,
      this.connectedOverlay.backdropClick
    ).pipe(mapTo(false));

    this.isPanelVisible$ = this.focusMonitor.monitor(this.inputEl).pipe(
      filter((focused) => !!focused),
      mapTo(true)
    );

    this.showPanel$ = merge(this.isPanelHidden$, this.isPanelVisible$);
  }

  createApplications() {
    this.applications = [];
    for (let i = 0; i < 100; i++) {
      this.applications.push('application #' + (i + 1));
    }
  }

  selectApplication(application: string) {
    this.selectedApplication = application;
  }
}
