import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  // 任务
  @Input() task;
  @Output() taskClick = new EventEmitter<void>();
  avatar: string;

  constructor() {}

  ngOnInit() {
    this.avatar = this.task.owner ? this.task.owner.avatar : 'unassigned';
  }

  // 条目点击事件
  onItemClick(): void {
    this.taskClick.emit();
  }

  // 单选框点击事件
  onCheckBoxClick(ev: Event): void {
    ev.stopPropagation();
  }

}
