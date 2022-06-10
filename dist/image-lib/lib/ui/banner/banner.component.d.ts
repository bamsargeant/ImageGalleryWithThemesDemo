import { OnInit } from '@angular/core';
import { ThemeService } from '../../data-access/theme.service';
import * as i0 from "@angular/core";
export declare class BannerComponent implements OnInit {
    private themeService;
    constructor(themeService: ThemeService);
    ngOnInit(): void;
    get themeName(): string | undefined;
    changeTheme(lightMode: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BannerComponent, "img-lib-banner", never, {}, {}, never, never, false>;
}
