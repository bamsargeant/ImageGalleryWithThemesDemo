import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ToggleSwitchComponent {
    checked: boolean;
    onCheck: EventEmitter<boolean>;
    constructor();
    changeChecked(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggleSwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToggleSwitchComponent, "img-lib-toggle-switch", never, { "checked": "checked"; }, { "onCheck": "onCheck"; }, never, never, false>;
}
