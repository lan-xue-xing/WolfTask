import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Address } from '../../models';
import { getAreaByCity, getCitiesByProvince, getProvince } from '.././../utils';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AreaListComponent), multi: true
    },
    {
      provide: NG_VALIDATORS, useExisting: forwardRef(() => AreaListComponent), multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaListComponent implements OnInit, ControlValueAccessor, OnDestroy {

  // 地址信息
  _address: Address = {
    province: '',
    city:     '',
    district: '',
    street:   ''
  };
  // 数据流
  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street = new Subject();
  subValue: Subscription;
  provinces$: Observable<string[]>;
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    const province$ = this._province.asObservable().startWith('');
    const city$ = this._city.asObservable().startWith('');
    const district$ = this._district.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('');
    const value$ = Observable.combineLatest([province$, city$, district$, street$], (_p, _c, _d, _s) => {
      return {province: _p, city: _c, districe: _d, street: _s}
    });
    this.subValue = value$.subscribe(v => this.propagateChange(v));
    this.provinces$ = Observable.of(getProvince());
    this.cities$ = province$.map((p: string) => getCitiesByProvince(p));
    this.districts$ = Observable.combineLatest(province$, city$, (_p: string, _c: string) => getAreaByCity(_p, _c));
  }

  // 空函数体，真正使用的方法在 registerOnChange 中，由框架注册，我们仅需把变化 emit 回表单
  private propagateChange = (_: any) => {};

  // 写入控件值 --> 将模型中的新值写入视图或 DOM 属性中
  writeValue(obj: Address): void {
    if (obj) {
      this._address = obj;
      if (this._address.province) {
        this._province.next(this._address.province);
      }
      if (this._address.city) {
        this._city.next(this._address.city);
      }
      if (this._address.district) {
        this._district.next(this._address.district);
      }
      if (this._address.street) {
        this._street.next(this._address.street);
      }
    }
  }

  // 当表单控件值改变的时候，函数fn被调用（相当于把变化 emit 回表单） --> 当控件接收到 change 事件后，调用的函数
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // 验证器
  validate(fc: FormControl): {[key: string]: any} {
    const value = fc.value;
    if (!value) {
      return null;
    }
    if (value.province && value.city && value.district && value.street) {
      return null;
    }
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(disabled: boolean): void {}

  // 省份变更
  onProvinceChange(): void {
    this._province.next(this._address.province);
  }

  // 城市变更
  onCityChange(): void {
    this._city.next(this._address.city);
  }

  // 区县变更
  onDistrictChange(): void {
    this._district.next(this._address.district);
  }

  // 街道地址变更
  onStreerChange(): void {
    this._street.next(this._address.street);
  }

  ngOnDestroy() {
    if (this.subValue) {this.subValue.unsubscribe()}
  }

}
