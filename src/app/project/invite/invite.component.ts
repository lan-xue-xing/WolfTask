import { User } from './../../models/user.model';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {

  // 组员
  // members = [
  //   {
  //     id: 1,
  //     name: '唐三'
  //   },
  //   {
  //     id: 2,
  //     name: '小舞'
  //   },
  //   {
  //     id: 3,
  //     name: '宁荣荣'
  //   },
  //   {
  //     id: 4,
  //     name: '朱竹清'
  //   }
  // ];
  members: User[] = [];

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<InviteComponent>
  ) { }

  ngOnInit() {
    this.members = [...this.data.members];
  }

  // 保存
  onSubmit(ev: Event, {value, valid}): void {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }

  // 显示候选人
  displayUser(user: {id: string, name: string}): string {
    return user ? user.name : '';
  }

}
