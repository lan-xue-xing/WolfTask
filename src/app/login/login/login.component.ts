import { Quote } from './../../models/quote.model';
import { QuoteService } from './../../services/quote.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // 表单
  form: FormGroup;
  quote: Quote = {
    id: '0',
    cn: '人生并不像火车要通过每个站似的经过每一个生活阶段。人生总是直向前行走，从不留下什么。',
    en: 'Life is not like a train going through every station like every stage of life' +
        'Life is always moving forward without leaving anything behind.',
    pic: '/assets/img/quote_fallback.jpg'
  };

  constructor(
    private quoteService$: QuoteService
  ) {
    this.quoteService$.getQuote().subscribe((quote: Quote) => this.quote = quote);
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, this.validator]))
    });
  }

  // 登录
  onSubmit({value, valid}, ev: Event): void {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
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
