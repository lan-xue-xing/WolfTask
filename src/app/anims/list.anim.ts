import { animate, group, state, style, transition, trigger, query, stagger } from '@angular/animations';

// 路由动画
export const listAnimation = trigger('listAnim', [
    transition('* => *', [
        query(':enter', style({opacity: 0}), { optional: true }),
        query(':enter', stagger(100, [
            animate('1s', style({opacity: 1}))
        ]), { optional: true }),
        query(':leave', style({opacity: 1}), { optional: true }),
        query(':leave', stagger(100, [
            animate('1s', style({opacity: 0}))
        ]), { optional: true }),
    ])
    // void => * 可以写成 :enter
    // * => void 可以写成 :leave
    // query 搜索子节点中的元素来设置相应的动画
    // stagger 动画错开，依次执行
]);
