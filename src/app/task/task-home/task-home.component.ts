import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from './../../anims/router.anim';
import { NewTaskComponent } from './../new-task/new-task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  // 任务列表
  tasklists = [
    {
      id: 1,
      name: '待办',
      order: 1,
      tasks: [
        {
          id: 1,
          desc: '任务一: 去洛丁城学习魂技',
          completed: true,
          priority: 1,
          owner: {
            id: 1,
            name: '奥斯卡',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: '任务二: 去史莱克学校学习',
          completed: false,
          priority: 2,
          owner: {
            id: 2,
            name: '宁荣荣',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          reminder: new Date()
        }
      ]
    },
    {
      id: 2,
      name: '进行中',
      order: 2,
      tasks: [
        {
          id: 3,
          desc: '任务三: 去大魂师学院学习',
          completed: false,
          priority: 3,
          owner: {
            id: 3,
            name: '戴沐白',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date()
        },
        {
          id: 4,
          desc: '任务四: 去史莱克学校学习',
          completed: false,
          priority: 3,
          owner: {
            id: 4,
            name: '朱竹清',
            avatar: 'avatars:svg-14'
          },
          dueDate: new Date()
        }
      ]
    }
  ];

  constructor(private dialog: MdDialog) {}

  ngOnInit() {
  }

  openNewTaskDialog(): void {}

  // 新建任务对话框弹出框
  launchNewTaskDialog(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '新建任务'}});
  }

  // 移动列表所有内容弹出框
  launchCopyTaskDialog(): void {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.tasklists}});
  }

  // 更新条目弹出框
  launchUpdateTaskDialog(task): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '修改任务', task: task}});
  }

  // 删除项目弹出框
  launchDeleteTaskDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除任务列表', content: '你确定删除该任务列表嘛？'}});
  }

  // 修改列表名框弹出框
  launchEditTaskDialog(): void {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '更改列表名'}});
    dialogRef.afterClosed().subscribe(result => console.log('结果返回： ', result));
  }

  // 处理拖拽事件
  handleMove(srcData, list): void {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handle item');
        break;
      case 'task-list':
        console.log('handle list');
        const srcList = srcData.data;
        const tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default:
        break;
    }
  }

  // 单选框选中事件
  handleCompleteTask(): void {}

  // 快速创建任务
  handleQuickTask(desc: string): void {
    console.log('快速创建的任务： ', desc);
  }

}
