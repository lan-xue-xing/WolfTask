import { Component, Input, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { differenceInDays, differenceInMonths, differenceInYears, format, isBefore, parse, subDays, subMonths, subYears } from 'date-fns';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { isValidDate } from '../../utils';

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AgeInputComponent), multi: true
    },
    {
      provide: NG_VALIDATORS, useExisting: forwardRef(() => AgeInputComponent), multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnDestroy {

  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsTop = 150;
  @Input() yearsBottom = 1;
  @Input() format = 'YYYY-MM-DD';
  @Input() debounceTime = 300;

  // 表单
  form: FormGroup;
  ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];
  selectedUnit = AgeUnit.Year;
  subMerge: Subscription;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      birthday: ['', this.validateDate],
      age: fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });
    // 分别获取表单各自控制器
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    // 生日流 (过滤掉校验不通过的值)
    const birthday$ = birthday.valueChanges.map(d => {
      return {date: d, form: 'birthday'}
    }).filter(_ => birthday.valid);

    // 年龄数字 + 年龄单位 (流) --> 赋予开始值去除抖动和重复值
    const ageNum$ = ageNum.valueChanges.startWith(ageNum.value).debounceTime(this.debounceTime).distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges.startWith(ageUnit.value).debounceTime(this.debounceTime).distinctUntilChanged();
     // 年龄流 (合并年龄数字和年龄单位并过滤掉校验不通过的值)
    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({age: _n, unit: _u});
    }).map(d => {
      return {date: d, form: 'age'}
    }).filter(_ => this.form.get('age').valid);

    // 合并生日流和年龄流 (过滤掉校验不通过的值)
    const merged$ = Observable.merge(birthday$, age$).filter(_ => this.form.valid);

    // 订阅流 ({emitEvent: false}更改表单控制器的值时valueChanges事件默认true会被触发向外发射事件，这里为了不让控件相互影响彼此进入死循环设置成false)
    this.subMerge = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.form === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, {emitEvent: false});
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, {emitEvent: false});
          this.propagateChange(d.date);
        }
      }
    });
  }

  // 日期转年龄
  private toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date) ? {age: differenceInDays(now, date), unit: AgeUnit.Day} :
           isBefore(subMonths(now, this.monthsTop), date) ? {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
            {age: differenceInYears(now, date), unit: AgeUnit.Year};
  }

  // 年龄转日期
  private toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.format);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.format);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.format);
      }
      default: {
        return null;
      }
    }
  }

  // 空函数体，真正使用的方法在 registerOnChange 中，由框架注册，我们仅需把变化 emit 回表单
  private propagateChange = (_: any) => {};


  // 写入控件值 --> 将模型中的新值写入视图或 DOM 属性中
  writeValue(obj: any): void {
    if (obj) {
      const date = format(obj, this.format);
      this.form.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }

  // 当表单控件值改变的时候，函数fn被调用（相当于把变化 emit 回表单） --> 当控件接收到 change 事件后，调用的函数
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  // 表单校验器（全局）
  validate(fc: FormControl): {[key: string]: any} {
    const value = fc.value;
    if (!value) {
      return null;
    }
    if (isValidDate(value)) {
      return null;
    }
    return {dateOfBirthInvalid: true};
  }

  // 日期校验器
  validateDate(fc: FormControl): {[key: string]: any} {
    const value = fc.value;
    return isValidDate(value) ? null : {birthdayInvalid: true}
  }

  // 年龄校验器
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        }
        default: {
          break;
        }
      }
      return result ? null : {ageInvalid: true}
    };
  }

  ngOnDestroy() {
    if (this.subMerge) {this.subMerge.unsubscribe()}
  }

}


// 年龄单位枚举
export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

// 年龄接口
export interface Age {
  age:  number;
  unit: AgeUnit
}
