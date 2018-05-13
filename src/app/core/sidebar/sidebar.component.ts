import { Component, OnInit } from '@angular/core';
import { getDate } from 'date-fns';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // 今天的日期
  today = 'day';

  constructor() { }

  ngOnInit() {
    this.today = `day${getDate(new Date())}`;
  }

}
