import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ImageListSelectComponent), multi: true
    },
    {
      provide: NG_VALIDATORS, useExisting: forwardRef(() => ImageListSelectComponent), multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageListSelectComponent implements ControlValueAccessor {

  // 九宫格
  selected: string;
  @Input() title = '请选择';
  @Input() cols = 6;
  @Input() rowHeight = '1:1';
  @Input() items: string[] = [];
  @Input() useSvgIcon = false;
  @Input() itemWidth = '80px';
  @Output('itemChange') itemChange = new EventEmitter<string>();

  // 空函数体，真正使用的方法在 registerOnChange 中，由框架注册，我们仅需把变化 emit 回表单
  private propagateChange = (_: any) => {};

  constructor() { }

  // 点击事件
  onChange(index: number): void {
    this.selected = this.items[index];
    this.propagateChange(this.selected);
    this.itemChange.emit(this.selected);
  }

  // 写入控件值 --> 将模型中的新值写入视图或 DOM 属性中
  writeValue(obj: any): void {
    if (obj && obj !== '') {
      this.selected = obj;
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
    return this.selected ? null : {
      imageListInvlid: {
        valid: false
      }
    }
  }

}
