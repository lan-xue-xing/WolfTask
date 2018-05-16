import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  // 标题
  @Input() header = '';

  constructor() { }

  ngOnInit() {
  }

}
