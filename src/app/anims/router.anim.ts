import { trigger, state, style, animate, transition } from '@angular/animations';

// 路由动画
export const slideToRight = trigger('routeAnim', [
    state('void', style({position: 'fixed', width: '100%', height: '80%'})),
    state('*', style({position: 'fixed', width: '100%', height: '80%'})),
    transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate('.5s ease-in-out', style({transform: 'translateX(0)'}))
    ]),
    transition('* => void', [
        style({transform: 'translateX(0)'}),
        animate('.5s ease-in-out', style({transform: 'translateX(100%)'}))
    ])
    // void => * 可以写成 :enter
    // * => void 可以写成 :leave
]);
