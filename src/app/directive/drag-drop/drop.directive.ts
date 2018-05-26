import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DragData, DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[appDrop][dropTags][dragEnterClass]'
})
export class DropDirective {

  // 私有属性
  private data$: Observable<DragData>;

  @Input() dragEnterClass: string;
  @Input() dropTags: string[] = [];
  @Output() dropped: EventEmitter<DragData> = new EventEmitter();

  // 事件监听
  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    // if (this.el.nativeElement === ev.target) {
      this.data$.subscribe((dragData: DragData) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    // }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    // if (this.el.nativeElement === ev.target) {
      this.data$.subscribe((dragData: DragData) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'all');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'move');
        } else {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'none');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'none');
        }
      });
    // }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    // if (this.el.nativeElement === ev.target) {
      this.data$.subscribe((dragData: DragData) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    // }
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    // if (this.el.nativeElement === ev.target) {
      this.data$.subscribe((dragData: DragData) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      });
    // }
  }

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService
  ) {
    this.data$ = this.service.getDragData().take(1);
  }

}
