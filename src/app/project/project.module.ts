import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { InviteComponent } from './invite/invite.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRoutingModule } from './project.routing.module';

@NgModule({
  imports: [
    ShareModule,
    ProjectRoutingModule
  ],
  declarations: [
    ProjectListComponent,
    ProjectItemComponent,
    NewProjectComponent,
    InviteComponent
  ],
  entryComponents: [
    NewProjectComponent,
    InviteComponent
  ]
})
export class ProjectModule { }
