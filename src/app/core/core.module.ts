import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from '../share/share.module';
import { loadSvgResources } from './../utils/svg.util';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import 'hammerjs';

@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    ShareModule
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
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    iconRegistry: MdIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    if (parent) {
      throw new Error('模块已经存在，不能再次加载！');
    }
    loadSvgResources(iconRegistry, domSanitizer);
  }
}
