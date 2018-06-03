import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FormReducer from '../../reducers/';
import { Auth } from '../../models';
import { Observable } from 'rxjs/Observable';
import * as FormAuthAction from '../../actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  auth$: Observable<Auth>;

  constructor(
    private store$: Store<FormReducer.State>
  ) {
    this.auth$ = this.store$.select(FormReducer.getAuthState);
  }

  ngOnInit() {
    this.auth$.subscribe(res => console.log('登录认证： ', res));
  }

  // 侧滑菜单切换
  openSideBar(): void {
    this.toggle.emit();
  }

  // 夜间模式切换
  onChange(checked: boolean): void {
    this.toggleDarkTheme.emit(checked);
  }

  // 退出
  logout(): void {
    this.store$.dispatch(new FormAuthAction.LogoutAction(null));
  }

}
