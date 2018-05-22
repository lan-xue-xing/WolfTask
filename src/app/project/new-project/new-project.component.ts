import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  // 标题
  title: '';

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<NewProjectComponent>
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    console.log('Dialog发来消息：', JSON.stringify(this.data));
  }

  // 保存
  onSave(): void {
    this.dialogRef.close('I received you message! Being saved');
  }

}
