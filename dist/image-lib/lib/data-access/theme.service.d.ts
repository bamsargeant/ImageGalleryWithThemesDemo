import { ElementRef, RendererFactory2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class ThemeService {
    private rendererFactory;
    private domSanitizer;
    activeThemeName: string | undefined;
    private theme$;
    private availableThemes;
    private elementRef;
    private renderer;
    constructor(rendererFactory: RendererFactory2, domSanitizer: DomSanitizer);
    loadElementRef(elemRef: ElementRef): void;
    loadTheme(themeName: string): void;
    private parseThemeKeys;
    private sanitize;
    private injectVariable;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ThemeService>;
}
