import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ShareModule } from '../share/share.module';
import { loadSvgResources } from './../utils/svg.util';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ServicesModule } from '../services/services.module';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import '../utils/debug.util';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'hammerjs';

@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    ShareModule,
    RouterModule,
    AppRoutingModule,
    ServicesModule.forRoot()
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
    SidebarComponent,
    AppRoutingModule
  ],
  providers: [
    {provide: 'BASE_CONFIG', useValue: {
      uri: 'http://localhost:3000'
    }}
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
