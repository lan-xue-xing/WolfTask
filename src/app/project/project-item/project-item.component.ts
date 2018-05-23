import { Component, EventEmitter, Input, OnInit, Output, HostBinding, HostListener } from '@angular/core';
import { cardAnim } from './../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnim]
})
export class ProjectItemComponent implements OnInit {

  @Input() project;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';
  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

  constructor() { }

  ngOnInit() {
  }

  // 邀请
  onInviteClick(): void {
    this.onInvite.emit();
  }

  // 编辑
  onEditClick(): void {
    this.onEdit.emit();
  }

  // 删除
  onDeleteClick(): void {
    this.onDelete.emit();
  }

}
