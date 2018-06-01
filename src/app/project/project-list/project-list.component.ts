import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { slideToRight } from '../../anims/router.anim';
import { Project } from '../../models';
import { ProjectService } from '../../services/project.service';
import { InviteComponent } from '../invite/invite.component';
import { NewProjectComponent } from '../new-project/new-project.component';
import { listAnimation } from './../../anims/list.anim';
import { ConfirmDialogComponent } from './../../share/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnim') state;
  // 项目集
  // projects = [
  //   {
  //     id: 1,
  //     name: '狼性任务协作平台',
  //     desc: '一个秘密组织项目',
  //     coverImg: 'assets/img/covers/0.jpg'
  //   },
  //   {
  //     id: 2,
  //     name: '二十四桥明月夜',
  //     desc: '一个很牛B的魂导器',
  //     coverImg: 'assets/img/covers/1.jpg'
  //   }
  // ];
  projects: Project[];
  subProject: Subscription;

  constructor(
    private dialog: MdDialog,
    private cdr: ChangeDetectorRef,
    private service$: ProjectService
  ) {}

  ngOnInit() {
    this.subProject = this.service$.get('1').subscribe((projects: Project[]) => {
      this.projects = projects;
      this.cdr.markForCheck();
    });
  }

  // 新增弹出框
  openNewProjectDialog(): void {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(
      NewProjectComponent,
      {data: {
        thumbnails: this.getThumbnails(),
        img: selectedImg
      }}
    );
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('Dialog回传的信息：', result);
    //   this.projects = [...this.projects, {
    //     id: 3, name: '青莲地心火', desc: '青莲地心火，小说《斗破苍穹》里的一种异火。', coverImg: 'assets/img/covers/2.jpg'
    //   }];
    //   this.cdr.markForCheck();
    // });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({...val, coverImg: this.buildImgStr(val.coverImg)}))
      .switchMap(v => this.service$.add(v))
      .subscribe(project => {
        this.projects = [...this.projects, project];
        this.cdr.markForCheck();
      });
  }

  // 邀请弹出框
  launchInviteDialog(): void {
    this.dialog.open(InviteComponent, {data: {members: []}});
  }

  // 编辑弹出框
  launchUpdateDialog(project: Project): void {
    // this.dialog.open(NewProjectComponent, {data: {title: '编辑项目'}});
    const dialogRef = this.dialog.open(
      NewProjectComponent,
      {data: {
        thumbnails: this.getThumbnails(),
        project: project
      }}
    );
    dialogRef.afterClosed()
    .take(1)
    .filter(n => n)
    .map(val => ({...val, id: project.id, coverImg: this.buildImgStr(val.coverImg)}))
    .switchMap(v => this.service$.update(v))
    .subscribe(prj => {
      const index = this.projects.map(p => p.id).indexOf(project.id);
      this.projects = [...this.projects.slice(0, index), prj, ...this.projects.slice(index + 1)];
      this.cdr.markForCheck();
    });
  }

  // 删除弹出框
  launchDeleteDialog(project): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '你确认删除该项目嘛？'}});
    // dialogRef.afterClosed().subscribe(result => {
    //   this.projects = this.projects.filter(p => p.id !== project.id);
    //   this.cdr.markForCheck();
    // });
    dialogRef.afterClosed()
    .take(1)
    .filter(n => n)
    .switchMap(_ => this.service$.delete(project))
    .subscribe(prj => {
      this.projects = [...this.projects.filter(p => p.id !== prj.id)];
      this.cdr.markForCheck();
    });
  }

  // 获取缩略图片集
  private getThumbnails(): string[] {
    return _.range(0, 40)
      .map(idx => `assets/img/covers/${idx}_tn.jpg`);
  }

  // 获取大图
  private buildImgStr(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }

  ngOnDestroy() {
    if (this.subProject) {
      this.subProject.unsubscribe();
    }
  }

}
