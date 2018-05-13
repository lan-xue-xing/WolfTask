import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  // 侧滑菜单切换
  openSideBar(): void {
    this.toggle.emit();
  }

  // 夜间模式切换
  onChange(checked: boolean): void {
    this.toggleDarkTheme.emit(checked);
  }

}
