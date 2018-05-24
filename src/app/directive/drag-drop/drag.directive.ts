import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDrag][draggedClass]'
})
export class DragDirective {

  // 私有属性
  private _isDraggable = false;

  @Input('appDrag')
  set isDraggable(val: boolean) {
    this._isDraggable = val;
    // 給对应的Dom元素动态设置元素属性
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }

  get isDraggable() {
    return this._isDraggable;
  }

  @Input() draggedClass: string;
  // 事件监听
  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      // 給对应的Dom元素动态添加class样式
      this.rd.addClass(this.el.nativeElement, this.draggedClass)
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      // 給对应的Dom元素动态添加class样式
      this.rd.removeClass(this.el.nativeElement, this.draggedClass)
    }
  }

  constructor(
    private el: ElementRef,
    private rd: Renderer2
  ) { }

}
