import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DragDropService {

  // 私有属性（总能记住上一次的值）
  private _dragData = new BehaviorSubject<DragData>(null);

  setDragData(data: DragData): void {
    this._dragData.next(data);
  }

  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  clearDragData(): void {
    this._dragData.next(null);
  }

  constructor() { }

}

// 定义推拽得接口
export interface DragData {
  tag: string;   // 唯一标识拖拽物
  data: any;     // 传递的数据
}
