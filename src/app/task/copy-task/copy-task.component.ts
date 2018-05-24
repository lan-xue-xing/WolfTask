import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyTaskComponent implements OnInit {

  // 卡片列表
  lists: any[];

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dalogRef: MdDialogRef<CopyTaskComponent>
  ) { }

  ngOnInit() {
    this.lists = this.data.lists;
  }

}
