import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { itemAnim } from '../../anims/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {

  // 任务
  avatar: string;
  widthPriority = 'in';
  @Input() task;
  @Output() taskClick = new EventEmitter<void>();
  @Output() taskComplete = new EventEmitter<void>();
  @HostListener('mouseenter')
  onMouseEnter() {
    this.widthPriority = 'out';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.widthPriority = 'in';
  }

  constructor() {}

  ngOnInit() {
    this.avatar = this.task.owner ? this.task.owner.avatar : 'unassigned';
  }

  // 条目点击事件
  onItemClick(ev: Event): void {
    ev.preventDefault();
    this.taskClick.emit();
  }

  // 单选框点击事件
  onCheckBoxClick(ev: Event): void {
    ev.stopPropagation();
  }

  // 单选框勾选状态变更检测
  oncheckBoxChanged(): void {
    this.taskComplete.emit();
  }

}
