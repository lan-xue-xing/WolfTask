import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskRoutingRoutingModule } from './task-routing.module';
import { NewTaskComponent } from './new-task/new-task.component';
import { CopyTaskComponent } from './copy-task/copy-task.component';

@NgModule({
  imports: [
    ShareModule,
    TaskRoutingRoutingModule
  ],
  declarations: [
    TaskHomeComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskHeaderComponent,
    NewTaskComponent,
    CopyTaskComponent
  ],
  entryComponents: [
    NewTaskComponent,
    CopyTaskComponent
  ]
})
export class TaskModule { }
