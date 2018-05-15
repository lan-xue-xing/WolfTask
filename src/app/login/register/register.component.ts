import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // 头像
  avatars: string[];

  constructor() {
    const indexs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.avatars = indexs.map(idx => `avatars:svg-${idx}`);
  }

  ngOnInit() {
  }

}
