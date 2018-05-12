import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MdToolbarModule } from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SidebarComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('模块已经存在，不能再次加载！');
    }
  }
}
