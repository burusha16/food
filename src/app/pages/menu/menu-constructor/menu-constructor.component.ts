import * as _ from 'lodash/core';
import {Subject} from 'rxjs';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AppService} from '@shared/services/base-app.service';
import {IGood} from '@shared/interfaces/good.interface';
import {IOrderFormConfig} from '@shared/interfaces/IOrderFormConfig.interface';
import {IOption} from '@shared/interfaces/option.interface';
import {EValidationStatus} from '@shared/enums/validation-status.enum';
import {MatDialog, MatDialogRef} from '@angular/material';
import {WindowScrollService} from '@shared/services/window-scroll.service';

export interface IMenuConstructorOutput {
  goodsCount: number;
  goods: IGood[];
}

@Component({
  selector: 'app-menu-constructor',
  templateUrl: './menu-constructor.component.html',
  styleUrls: ['./menu-constructor.component.scss']
})
export class MenuConstructorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() goods: IGood[];
  @Input() selectedGoods: IGood[] = [];
  @Output() setGoods: EventEmitter<IMenuConstructorOutput> = new EventEmitter();
  @Output() destroyConstructor: EventEmitter<void> = new EventEmitter();
  @ViewChild('dialog') dialogTemplate: TemplateRef<any>;
  @ViewChild('submitLine') submitLine: ElementRef;
  dialogRef!: MatDialogRef<any>;
  form: FormGroup;
  formConfig: IOrderFormConfig = this.appService.orderFormConfig;
  goodsCountsOptions: IOption[] = [];
  submitLineFixed$: Subject<boolean> = new Subject();
  onDestroy: Subject<void> = new Subject();

  constructor(private fb: FormBuilder,
              private appService: AppService,
              private translate: TranslateService,
              private dialog: MatDialog,
              private scrollService: WindowScrollService,
              private elRef: ElementRef) {
    this.form = this.fb.group({
      goodsCount: this.formConfig.defaultGoodsCount,
      goods: null
    });
    _.each(this.formConfig.avaibleGoodsCounts, (value: number) => {
      this.goodsCountsOptions.push({
        value: value,
        viewValue: this.translate.instant(`menu.constructor.${value}dishes`)
      });
    });
    this.goodsCountControl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.goodsControl.reset();
      });
  }

  ngOnInit() {
    const controls = this.goods.map((good: IGood) => new FormControl(this.selectedGoods.includes(good)));
    const validateGoods: ValidatorFn = (control: AbstractControl) => {
      const selectedControls = control.value.filter(value => value);
      if (selectedControls.length === this.goodsCountControl.value) {
        return null;
      }
      return {error: ''};
    };
    this.form.setControl('goods', new FormArray(controls));
    this.goodsControl.setValidators(validateGoods);
    this.goodsControl.statusChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy)
      )
      .subscribe((status: EValidationStatus) => {
        this.goodsControl.controls.forEach((control: FormArray) => {
          if (status === EValidationStatus.Valid && !control.value) {
            control.disable({onlySelf: true});
          } else {
            control.enable({onlySelf: true});
          }
        });
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngAfterViewInit() {
    const hostElement: HTMLElement = this.elRef.nativeElement;
    const submitLineElement: HTMLElement = this.submitLine.nativeElement;
    const breakpoint = submitLineElement.offsetTop;
    this.scrollService.addScrollListener(breakpoint, this.constructor.name, this.submitLineFixed$, hostElement);
  }

  get goodsControl(): FormArray {
    return this.form.get('goods') as FormArray;
  }

  get goodsCountControl(): AbstractControl {
    return this.form.get('goodsCount');
  }

  onDestroyConstructor() {
    this.destroyConstructor.emit();
  }

  onSubmit() {
    if (this.form.valid) {
      const goodsModels = this.goods.filter((good: IGood, index: number) => this.goodsControl.value[index]);
      const value: IMenuConstructorOutput = {
        goodsCount: this.goodsCountControl.value,
        goods: goodsModels
      };
      this.setGoods.emit(value);
      this.onDestroyConstructor();
    }
  }

  hideDialog() {
    this.dialogRef.close();
  }

  showDialog() {
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }
}
