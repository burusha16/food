import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-meal-info',
  templateUrl: './meal-info.component.html',
  styleUrls: ['./meal-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealInfoComponent {
}
