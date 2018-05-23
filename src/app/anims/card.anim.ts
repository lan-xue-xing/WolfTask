import { trigger, state, style, animate, transition } from '@angular/animations';

// 卡片动画
export const cardAnim = trigger('card', [
    state('out', style({transform: 'scale(1)', 'border-shadow': 'none'})),
    state('hover', style({transform: 'scale(1.1)', 'border-shadow': '3px 3px 5px 6px #CCC'})),
    transition('out => hover', animate('100ms ease-in')),
    transition('hover => out', animate('100ms ease-out'))
]);
