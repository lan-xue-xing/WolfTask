import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { InviteComponent } from '../invite/invite.component';
import { NewProjectComponent } from '../new-project/new-project.component';
import { ConfirmDialogComponent } from './../../share/confirm-dialog/confirm-dialog.component';

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

  // 新增弹出框
  openNewProjectDialog(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新增项目'}});
    dialogRef.afterClosed().subscribe(result => console.log('Dialog回传的信息：', result));
  }

  // 邀请弹出框
  launchInviteDialog(): void {
    this.dialog.open(InviteComponent);
  }

  // 编辑弹出框
  launchUpdateDialog(): void {
    this.dialog.open(NewProjectComponent, {data: {title: '编辑项目'}});
  }

  // 删除弹出框
  launchDeleteDialog(): void {
    this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '你确认删除该项目嘛？'}});
  }

}
