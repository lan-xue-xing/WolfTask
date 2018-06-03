import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as FormQuoteAction from '../../actions/quote.action';
import * as FormAuthAction from '../../actions/auth.action';
import * as FormReducer from '../../reducers';
import { Quote } from './../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  // 表单
  form: FormGroup;
  // quote: Quote = {
  //   id: '0',
  //   cn: '人生并不像火车要通过每个站似的经过每一个生活阶段。人生总是直向前行走，从不留下什么。',
  //   en: 'Life is not like a train going through every station like every stage of life' +
  //       'Life is always moving forward without leaving anything behind.',
  //   pic: '/assets/img/quote_fallback.jpg'
  // };
  quote$: Observable<Quote>;

  constructor(
    private store$: Store<FormReducer.State>
  ) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, this.validator]))
    });
  }

  ngOnInit() {
    this.store$.dispatch(new FormQuoteAction.FetchQuoteAction(null));
    this.quote$ = this.store$.select(FormReducer.getQuote);
    this.quote$.subscribe(res => {
      console.log('界面得到: ', res);
    });
  }

  // 登录
  onSubmit({value, valid}, ev: Event): void {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.store$.dispatch(new FormAuthAction.LoginAction(value));
  }

  // 自定义验证器
  validator(fc: FormControl): {[key: string]: any} {
    if (!fc.value) {
      return null;
    }
    const pattern = /^\w{6}$/;
    if (pattern.test(fc.value)) {
      return null;
    }
    return {
      emailNotValid: '密码必须是6位数字字母下划线'
    }
  }

}
