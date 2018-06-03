import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Identity, IdentityType } from './../../models';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => IdentityInputComponent), multi: true
    },
    {
      provide: NG_VALIDATORS, useExisting: forwardRef(() => IdentityInputComponent), multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityInputComponent implements OnInit, ControlValueAccessor, OnDestroy {

  // 证件类型
  identityTypes: {value: IdentityType, label: string}[] = [
    {
      value: IdentityType.Idcard, label: '身份证'
    },
    {
      value: IdentityType.Insurance, label: '医保'
    },
    {
      value: IdentityType.Passport, label: '护照'
    },
    {
      value: IdentityType.Military, label: '军官证'
    },
    {
      value: IdentityType.Other, label: '其他'
    }
  ];
  // 证件
  identity: Identity = {identityNo: null, identityType: null};
  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  subIdentity: Subscription;

  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }

  get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }

  constructor() { }

  ngOnInit() {
    const value$ = Observable.combineLatest(this.idNo, this.idType, (_no, _type) => {
      return { identityType: _type, identityNo: _no }
    });
    this.subIdentity = value$.subscribe(id => this.propagateChange(id));
  }

  // 空函数体，真正使用的方法在 registerOnChange 中，由框架注册，我们仅需把变化 emit 回表单
  private propagateChange = (_: any) => {};

  // 写入控件值 --> 将模型中的新值写入视图或 DOM 属性中
  writeValue(obj: Identity): void {
    if (obj) {
      this.identity = obj;
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
    switch (value.identityType) {
      case IdentityType.Idcard:
        this.validateIdCard(fc);
        break;
      case IdentityType.Passport:
        this.validatePassport(fc);
        break;
      case IdentityType.Military:
        this.validateMilitary(fc);
        break;
      case IdentityType.Insurance:
      case IdentityType.Other:
      default:
        break;
    }
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  // 证件类型变更
  onIdTypeChange(idType: IdentityType): void {
    this._idType.next(idType);
  }

  // 证件号码变更
  onIdNoChange(idNo: string): void {
    this._idNo.next(idNo);
  }

  // 身份证验证器
  validateIdCard(fc: FormControl): {[key: string]: any} {
    const value = fc.value.identityNo;
    if (value.length !== 18) {
      return {idInvalId: true}
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(value) ? null : {identityId: true};
  }

  // 护照验证器
  validatePassport(fc: FormControl): {[key: string]: any} {
    const value = fc.value.identityNo;
    if (value.length !== 9) {
      return {idInvalid: true}
    }
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(value) ? null : {identityId: true};
  }

  // 军官证验证器
  validateMilitary(fc: FormControl): {[key: string]: any} {
    const value = fc.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(value) ? null : {identityId: true};
  }

  ngOnDestroy() {
    this.subIdentity.unsubscribe();
  }

}
