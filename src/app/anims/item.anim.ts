import { trigger, state, style, animate, transition } from '@angular/animations';

// 条目动画
export const itemAnim = trigger('item', [
    state('out', style({'border-left-width': '3px'})),
    state('out', style({'border-left-width': '8px'})),
    transition('out => hover', animate('100ms ease-in')),
    transition('hover => out', animate('100ms ease-out'))
]);
