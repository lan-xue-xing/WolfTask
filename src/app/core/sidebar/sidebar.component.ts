import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getDate } from 'date-fns';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // 今天的日期
  today = 'day';
  @Output() navClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this.today = `day${getDate(new Date())}`;
  }

  // 菜单点击事件
  onNavClick(): void {
    this.navClick.emit();
  }

}
