import { listAnimation } from './../../anims/list.anim';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { slideToRight } from '../../anims/router.anim';
import { InviteComponent } from '../invite/invite.component';
import { NewProjectComponent } from '../new-project/new-project.component';
import { ConfirmDialogComponent } from './../../share/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation]
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  // 项目集
  projects = [
    {
      id: 1,
      name: '狼性任务协作平台',
      desc: '一个秘密组织项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      id: 2,
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
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog回传的信息：', result);
      this.projects = [...this.projects, {
        id: 3, name: '青莲地心火', desc: '青莲地心火，小说《斗破苍穹》里的一种异火。', coverImg: 'assets/img/covers/2.jpg'
      }];
    });
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
  launchDeleteDialog(project): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '你确认删除该项目嘛？'}});
    dialogRef.afterClosed().subscribe(result => {
      this.projects = this.projects.filter(p => p.id !== project.id);
    });
  }

}
