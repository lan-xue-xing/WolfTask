import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // 黑色主题
  darkTheme = false;

  // 夜间模式切换
  switchTheme(dark: boolean): void {
    this.darkTheme = dark;
  }
}
