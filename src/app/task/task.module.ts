import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskRoutingRoutingModule } from './task-routing.module';

@NgModule({
  imports: [
    ShareModule,
    TaskRoutingRoutingModule
  ],
  declarations: [TaskHomeComponent, TaskListComponent, TaskItemComponent, TaskHeaderComponent]
})
export class TaskModule { }
