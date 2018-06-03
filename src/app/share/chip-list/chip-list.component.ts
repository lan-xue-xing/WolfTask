import { ChangeDetectionStrategy, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ChipListComponent), multi: true
    },
    {
      provide: NG_VALIDATORS, useExisting: forwardRef(() => ChipListComponent), multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipListComponent implements OnInit, ControlValueAccessor {

  @Input() multiple = true;
  @Input() placeholderText = '输入成员邮箱';
  @Input() label = '添加/修改成员';


  // 表单
  form: FormGroup;
  items: User[] = [];
  memberResults$: Observable<User[]>;
  // 字典
  dictionaries: Array<User> = [];

  constructor(
    private fb: FormBuilder,
    private service: UserService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    });
    this.memberResults$ = this.form.get('memberSearch').valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length > 1)
      .switchMap(str => this.service.searchUsers(str));
  }

  // 空函数体，真正使用的方法在 registerOnChange 中，由框架注册，我们仅需把变化 emit 回表单
  private propagateChange = (_: any) => {};

  // 写入控件值 --> 将模型中的新值写入视图或 DOM 属性中
  writeValue(obj: User[]): void {
    if (obj && this.multiple) {
      // const userEntities = obj.reduce((entities, currUser) => ({...entities, currUser}), {});
      obj.forEach(user => {
        this.dictionaries[user.id] = user;
      });
      if (this.items) {
        // const remaining = this.items.filter(item => !userEntities[item.id]);
        const remaining = this.items.filter(user => !this.dictionaries[user.id]);
        this.items = [...remaining, ...obj];
      } else if (obj && !this.multiple) {
        this.items = [...obj];
      }
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

  // 自定义验证器
  validate(fc: FormControl): {[key: string]: any} {
    return this.items ? null : {
      chipListInvalid: {
        valid: false
      }
    };
  }

  // 移除成员
  removeMember(member: User): void {
    const ids = this.items.map(item => item.id);
    const idx = ids.indexOf(member.id);
    this.items = this.multiple ? [...this.items.slice(0, idx), ...this.items.slice(idx + 1)] : [];
    this.form.patchValue({memberSearch: ''});
    this.propagateChange(this.items);
  }

  // 成员选择
  handleMemberSelection(user: User): void {
    if (this.items.map(item => item.id).indexOf(user.id) !== -1) {
      return;
    }
    this.items = this.multiple ? [...this.items, user] : [user];
    this.form.patchValue({memberSearch: user.name});
    this.propagateChange(this.items);
  }

  // 自动完成显示
  displayUser(user: User): string {
    return user ? user.name : '';
  }

  // 是否显示自动完成下拉框
  get displayInput() {
    return this.multiple || this.items.length === 0;
  }

}
