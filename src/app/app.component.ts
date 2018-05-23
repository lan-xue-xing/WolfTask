import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // 黑色主题
  darkTheme = false;

  constructor(private oc: OverlayContainer) { }

  // 夜间模式切换
  switchTheme(dark: boolean): void {
    this.darkTheme = dark;
    this.oc.themeClass = dark ? 'myapp-dark-theme' : null;
  }

}
