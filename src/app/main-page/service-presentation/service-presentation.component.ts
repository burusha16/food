import { Component, OnInit, ChangeDetectorRef, ElementRef, AfterViewChecked } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Responsive } from 'src/app/shared/decorators/responsive.decorator';
import { IResponsiveComponent } from 'src/app/shared/interfaces/responsive-component.interface';
import { TranslateService } from '@ngx-translate/core';

@Responsive()
@Component({
  selector: 'app-service-presentation',
  templateUrl: './service-presentation.component.html',
  styleUrls: ['./service-presentation.component.scss']
})
export class ServicePresentationComponent implements OnInit, AfterViewChecked, IResponsiveComponent {
  isMobile: boolean;
  isSmall: boolean;
  isVideoVisible$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  videoEndedHandler = this.hideVideo.bind(this);
  videoRef: HTMLElement;

  constructor(private cdRef: ChangeDetectorRef,
              private elemRef: ElementRef,
              private translate: TranslateService) {
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    const videoRef = this.elemRef.nativeElement.querySelector('.presentation__video');
    if (videoRef) {
      this.videoRef = videoRef;
      this.videoRef.addEventListener('ended', this.videoEndedHandler);
    }
  }

  get title(): string {
    const suffix = this.isMobile ? '-mob' : '';
    return this.translate.instant(`main-page.presentation.subscription-dinners${suffix}`);
  }

  showVideo() {
    this.isVideoVisible$.next(true);
    this.cdRef.markForCheck();
  }

  hideVideo() {
    this.videoRef.removeEventListener('ended', this.videoEndedHandler);
    this.isVideoVisible$.next(false);
    this.cdRef.markForCheck();
  }
}
