import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  // 头像
  avatars: string[] = [];
  private readonly avatarName = 'avatars';

  // 表单
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    const indexs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.avatars = indexs.map(idx => `avatars:svg-${idx}`);
    this.form = fb.group({
      email:              [''],
      name:               [''],
      password:           [''],
      confirmPassword:    [''],
      avatar:             [img]
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

}
