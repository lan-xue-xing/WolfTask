import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {

  // 标题
  @Input() header = '';
  @Output() newTask = new EventEmitter<void>();
  @Output() moveAll = new EventEmitter<void>();
  @Output() deleteList = new EventEmitter<void>();
  @Output() editList = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  // 新建任务
  onNewTaskClick(): void {
    this.newTask.emit();
  }

  // 移动列表所有内容
  onMoveAllClick(): void {
    this.moveAll.emit();
  }

  // 删除项目
  onDeleteListDialog(): void {
    this.deleteList.emit();
  }

  // 修改列表名
  onEditListClick(): void {
    this.editList.emit();
  }

}
