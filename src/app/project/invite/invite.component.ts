import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  // 组员
  members = [
    {
      id: 1,
      name: '唐三'
    },
    {
      id: 2,
      name: '小舞'
    },
    {
      id: 3,
      name: '宁荣荣'
    },
    {
      id: 4,
      name: '朱竹清'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  // 保存
  onSave(): void { }

  // 显示候选人
  displayUser(user: {id: string, name: string}): string {
    return user ? user.name : '';
  }

}