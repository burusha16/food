import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Responsive} from '@shared/decorators/responsive.decorator';
import {IResponsiveComponent} from '@shared/interfaces/responsive-component.interface';
import {WindowScrollService} from '@shared/services/window-scroll.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Responsive()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy, IResponsiveComponent {
  @ViewChild('header') headerNode: ElementRef;
  isHeaderFixed$: Subject<boolean> = new Subject();
  isMobile: boolean;
  isSmall: boolean;
  OnDestroy$: Subject<void> = new Subject<void>();

  constructor(private scrollService: WindowScrollService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollService.pageUpdated$
      .pipe(takeUntil(this.OnDestroy$))
      .subscribe(() => {
        const breakpoint = this.headerNode.nativeElement.offsetTop;
        this.scrollService.addScrollListener(breakpoint, this.constructor.name, this.isHeaderFixed$);
      });
  }

  ngOnDestroy() {
    this.OnDestroy$.next();
    this.OnDestroy$.complete();
  }
}
