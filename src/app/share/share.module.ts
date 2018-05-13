import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdListModule, MdToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule
  ],
  exports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule
  ],
  declarations: []
})
export class ShareModule { }
