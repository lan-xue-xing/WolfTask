import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // 黑色主题
  darkTheme = false;

  switchTheme(dark: boolean): void {
    console.log('切换 ', dark);
    this.darkTheme = dark;
  }
}
