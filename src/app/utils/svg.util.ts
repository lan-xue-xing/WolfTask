import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

// 加载Svg图标
export const loadSvgResources = (ir: MdIconRegistry, ds: DomSanitizer) => {
    ir.addSvgIcon('category', ds.bypassSecurityTrustResourceUrl('assets/Category.svg'));
};
