import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <form>
      <h3 md-dialog-title>{{title}}</h3>
      <md-dialog-content>{{content}}</md-dialog-content>
      <div md-dialog-actions>
        <button type="button" md-raised-button color="primary" (click)="onClick(true)">确定</button>
        <button type="button" md-dialog-close md-button (click)="onClick(false)">取消</button>
      </div>
    </form>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {

  // 标题和内容
  title: '';
  content: '';

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  // 确定or取消
  onClick(result: boolean): void {
    this.dialogRef.close(result);
  }

}
