import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { InviteComponent } from '../invite/invite.component';
import { NewProjectComponent } from '../new-project/new-project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  // 项目集
  projects = [
    {
      name: '狼性任务协作平台',
      desc: '一个秘密组织项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      name: '二十四桥明月夜',
      desc: '一个很牛B的魂导器',
      coverImg: 'assets/img/covers/1.jpg'
    }
  ];

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  // 新增
  openNewProjectDialog(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: 'this is dialog sent message!'});
    dialogRef.afterClosed().subscribe(result => console.log('Dialog回传的信息：', result));
  }

  // 邀请回调
  launchInviteDialog(): void {
    this.dialog.open(InviteComponent);
  }

}
