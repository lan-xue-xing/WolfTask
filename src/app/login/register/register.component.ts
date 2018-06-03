import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { extractInfo, getAddrByCode, isValidAddr, isValidDate } from '../../utils';
import { Identity } from './../../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

  // 头像
  avatars: string[] = [];
  private readonly avatarName = 'avatars';

  // 表单
  form: FormGroup;
  subId: Subscription;

  constructor(
    private fb: FormBuilder
  ) {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    const indexs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.avatars = indexs.map(idx => `avatars:svg-${idx}`);
    this.form = fb.group({
      email:              [],
      name:               [],
      password:           [],
      confirmPassword:    [],
      avatar:             [img],
      dateOfBirth:        ['1995-06-23'],
      identity:           [],
      address:            []
    });
    const id$ = this.form.get('identity').valueChanges
      .debounceTime(300)
      .filter(_ => this.form.get('identity').valid);
    this.subId = id$.subscribe((id: Identity) => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
      }
      if (isValidDate(info.dateOfBirth)) {
        this.form.get('dateOfBirth').patchValue(info.dateOfBirth);
      }
    });
  }

  ngOnInit() {
  }

  // 注册
  onSubmit({value, valid}, ev: Event): void {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
  }

  ngOnDestroy() {
    if (this.subId) {this.subId.unsubscribe()}
  }

}
