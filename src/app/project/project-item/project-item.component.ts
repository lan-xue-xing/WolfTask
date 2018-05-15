import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project;
  @Output() onInvite = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  // 邀请
  onInviteClick(): void {
    this.onInvite.emit();
  }

}
