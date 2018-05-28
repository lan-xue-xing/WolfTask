import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { differenceInDays, differenceInMonths, differenceInYears, format, isBefore, parse, subDays, subMonths, subYears } from 'date-fns';
import { Observable } from 'rxjs/Observable';

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
export class AgeInputComponent implements ControlValueAccessor {

  // 表单
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      birthday: ['', this.validateDate],
      age: fb.group({
        ageNum: [],
        ageUnit: []
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit', );

    // 生日流
    const birthday$ = birthday.valueChanges.map(d => {
      return {date: d, form: 'birthday'}
    }).filter(_ => birthday.valid);

    // 年龄流
    const ageNum$ = ageNum.valueChanges.startWith(ageNum.value).debounceTime(300).distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges.startWith(ageUnit.value).debounceTime(300).distinctUntilChanged();
    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({age: _n, unit: _u});
    }).map(d => {
      return {date: d, form: 'age'}
    }).filter(_ => this.form.get('age').valid);

    // 合并生日流和年龄流
    const merged$ = Observable.merge(birthday$, age$).filter(_ => this.form.valid);

    // 订阅流
    merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.form === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if (age.unit !== ageUnit.value) {
          ageNum.patchValue(age.unit, {emitEvent: false});
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
    return isBefore(subDays(now, 90), date) ? {age: differenceInDays(now, date), unit: AgeUnit.Day} :
           isBefore(subMonths(now, 24), date) ? {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
            {age: differenceInYears(now, date), unit: AgeUnit.Year};
  }

  // 年龄转日期
  private toDate(age: Age): string {
    const now = Date.now();
    const dateFormat = 'YYYY-MM-DD';
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), dateFormat);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), dateFormat);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), dateFormat);
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
    return null;
  }

  // 日期校验器
  validateDate(fc: FormControl):  {[key: string]: any} {
    return null;
  }

  // 年龄校验器
  validateAge(ageNumKey: string, ageUnitKey: string): {[key: string]: any} {
    return null;
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
