import { Injectable, RendererStyleFlags2, SecurityContext, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dark, light } from '../models/theme.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class ThemeService {
    constructor(rendererFactory, domSanitizer) {
        this.rendererFactory = rendererFactory;
        this.domSanitizer = domSanitizer;
        this.activeThemeName = undefined;
        this.theme$ = new BehaviorSubject(undefined);
        this.availableThemes = [light, dark];
        this.renderer = this.rendererFactory.createRenderer(this.elementRef, null);
        // listen to the theme observable and update the css variables as they come in
        this.theme$.subscribe((themeData) => {
            if (themeData) {
                this.activeThemeName = themeData.name;
                this.parseThemeKeys(themeData.properties, (key, value) => {
                    this.injectVariable(key, value);
                });
            }
        });
    }
    // since this is inside a lib, load the element ref from the main project (app.component)
    loadElementRef(elemRef) {
        this.elementRef = elemRef;
    }
    // get the theme from the backend
    loadTheme(themeName) {
        // check the theme is available
        const theme = this.availableThemes.find((x) => x.name == themeName);
        if (theme) {
            this.theme$.next(theme);
        }
        else {
            console.log('Unable to find theme: ' + themeName);
        }
    }
    // loop over every key in theme json
    parseThemeKeys(json, parse) {
        for (const key in json) {
            if (typeof json[key] == 'object' && json[key] != null) {
                this.parseThemeKeys(json[key], parse);
            }
            else if (Object.prototype.hasOwnProperty.call(json, key)) {
                parse(key, json[key]);
            }
        }
    }
    // sanitize a variable
    sanitize(variable) {
        return this.domSanitizer.sanitize(SecurityContext.STYLE, variable);
    }
    // inject variable into the element ref
    injectVariable(key, value) {
        const sanitizedKey = this.sanitize(key);
        const sanitizedValue = this.sanitize(value);
        if (sanitizedKey && sanitizedValue) {
            // Use the Renderer2 to set the style - DOM safer than using the elementRef directly
            this.renderer.setStyle(this.elementRef.nativeElement, sanitizedKey, sanitizedValue, RendererStyleFlags2.DashCase);
        }
        else {
            console.error('Unable to inject theme variable');
            console.error('Pre-sanitized key / value  - ' + key + ': ' + value);
            console.log('Unable to sanitize key - ' + sanitizedKey == null);
            console.log('Unable to sanitize value - ' + sanitizedValue == null);
        }
    }
}
ThemeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ThemeService, deps: [{ token: i0.RendererFactory2 }, { token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
ThemeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ThemeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ThemeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.RendererFactory2 }, { type: i1.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ltYWdlLWxpYi9zcmMvbGliL2RhdGEtYWNjZXNzL3RoZW1lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFVBQVUsRUFHVixtQkFBbUIsRUFDbkIsZUFBZSxHQUNoQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFTLE1BQU0sdUJBQXVCLENBQUM7OztBQUszRCxNQUFNLE9BQU8sWUFBWTtJQU92QixZQUNVLGVBQWlDLEVBQ2pDLFlBQTBCO1FBRDFCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUNqQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVI3QixvQkFBZSxHQUF1QixTQUFTLENBQUM7UUFDL0MsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFvQixTQUFTLENBQUMsQ0FBQztRQUMzRCxvQkFBZSxHQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBUS9DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUzRSw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUE0QixFQUFFLEVBQUU7WUFDckQsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLEVBQUU7b0JBQ3ZFLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQseUZBQXlGO0lBQ2xGLGNBQWMsQ0FBQyxPQUFtQjtRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQsaUNBQWlDO0lBQzFCLFNBQVMsQ0FBQyxTQUFpQjtRQUNoQywrQkFBK0I7UUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLENBQUM7UUFDcEUsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxTQUFTLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFFRCxvQ0FBb0M7SUFDNUIsY0FBYyxDQUFDLElBQVMsRUFBRSxLQUFlO1FBQy9DLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3ZDO2lCQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDMUQsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQztJQUVELHNCQUFzQjtJQUNkLFFBQVEsQ0FBQyxRQUFnQjtRQUMvQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELHVDQUF1QztJQUMvQixjQUFjLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDL0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVDLElBQUksWUFBWSxJQUFJLGNBQWMsRUFBRTtZQUNsQyxvRkFBb0Y7WUFDcEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUM3QixZQUFZLEVBQ1osY0FBYyxFQUNkLG1CQUFtQixDQUFDLFFBQVEsQ0FDN0IsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUcsWUFBWSxJQUFJLElBQUksQ0FBQyxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEdBQUcsY0FBYyxJQUFJLElBQUksQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQzs7eUdBM0VVLFlBQVk7NkdBQVosWUFBWSxjQUZYLE1BQU07MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbGVtZW50UmVmLFxuICBJbmplY3RhYmxlLFxuICBSZW5kZXJlcjIsXG4gIFJlbmRlcmVyRmFjdG9yeTIsXG4gIFJlbmRlcmVyU3R5bGVGbGFnczIsXG4gIFNlY3VyaXR5Q29udGV4dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGFyaywgbGlnaHQsIFRoZW1lIH0gZnJvbSAnLi4vbW9kZWxzL3RoZW1lLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFRoZW1lU2VydmljZSB7XG4gIHB1YmxpYyBhY3RpdmVUaGVtZU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSB0aGVtZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRoZW1lIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICBwcml2YXRlIGF2YWlsYWJsZVRoZW1lczogVGhlbWVbXSA9IFtsaWdodCwgZGFya107XG4gIHByaXZhdGUgZWxlbWVudFJlZiE6IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICBwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICkge1xuICAgIHRoaXMucmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcih0aGlzLmVsZW1lbnRSZWYsIG51bGwpO1xuXG4gICAgLy8gbGlzdGVuIHRvIHRoZSB0aGVtZSBvYnNlcnZhYmxlIGFuZCB1cGRhdGUgdGhlIGNzcyB2YXJpYWJsZXMgYXMgdGhleSBjb21lIGluXG4gICAgdGhpcy50aGVtZSQuc3Vic2NyaWJlKCh0aGVtZURhdGE6IFRoZW1lIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICBpZiAodGhlbWVEYXRhKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGhlbWVOYW1lID0gdGhlbWVEYXRhLm5hbWU7XG4gICAgICAgIHRoaXMucGFyc2VUaGVtZUtleXModGhlbWVEYXRhLnByb3BlcnRpZXMsIChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIHRoaXMuaW5qZWN0VmFyaWFibGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gc2luY2UgdGhpcyBpcyBpbnNpZGUgYSBsaWIsIGxvYWQgdGhlIGVsZW1lbnQgcmVmIGZyb20gdGhlIG1haW4gcHJvamVjdCAoYXBwLmNvbXBvbmVudClcbiAgcHVibGljIGxvYWRFbGVtZW50UmVmKGVsZW1SZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYgPSBlbGVtUmVmO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSB0aGVtZSBmcm9tIHRoZSBiYWNrZW5kXG4gIHB1YmxpYyBsb2FkVGhlbWUodGhlbWVOYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBjaGVjayB0aGUgdGhlbWUgaXMgYXZhaWxhYmxlXG4gICAgY29uc3QgdGhlbWUgPSB0aGlzLmF2YWlsYWJsZVRoZW1lcy5maW5kKCh4KSA9PiB4Lm5hbWUgPT0gdGhlbWVOYW1lKTtcbiAgICBpZiAodGhlbWUpIHtcbiAgICAgIHRoaXMudGhlbWUkLm5leHQodGhlbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGZpbmQgdGhlbWU6ICcgKyB0aGVtZU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGxvb3Agb3ZlciBldmVyeSBrZXkgaW4gdGhlbWUganNvblxuICBwcml2YXRlIHBhcnNlVGhlbWVLZXlzKGpzb246IGFueSwgcGFyc2U6IEZ1bmN0aW9uKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4ganNvbikge1xuICAgICAgaWYgKHR5cGVvZiBqc29uW2tleV0gPT0gJ29iamVjdCcgJiYganNvbltrZXldICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5wYXJzZVRoZW1lS2V5cyhqc29uW2tleV0sIHBhcnNlKTtcbiAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGpzb24sIGtleSkpIHtcbiAgICAgICAgcGFyc2Uoa2V5LCBqc29uW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHNhbml0aXplIGEgdmFyaWFibGVcbiAgcHJpdmF0ZSBzYW5pdGl6ZSh2YXJpYWJsZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9tU2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5TVFlMRSwgdmFyaWFibGUpO1xuICB9XG5cbiAgLy8gaW5qZWN0IHZhcmlhYmxlIGludG8gdGhlIGVsZW1lbnQgcmVmXG4gIHByaXZhdGUgaW5qZWN0VmFyaWFibGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzYW5pdGl6ZWRLZXkgPSB0aGlzLnNhbml0aXplKGtleSk7XG4gICAgY29uc3Qgc2FuaXRpemVkVmFsdWUgPSB0aGlzLnNhbml0aXplKHZhbHVlKTtcblxuICAgIGlmIChzYW5pdGl6ZWRLZXkgJiYgc2FuaXRpemVkVmFsdWUpIHtcbiAgICAgIC8vIFVzZSB0aGUgUmVuZGVyZXIyIHRvIHNldCB0aGUgc3R5bGUgLSBET00gc2FmZXIgdGhhbiB1c2luZyB0aGUgZWxlbWVudFJlZiBkaXJlY3RseVxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHNhbml0aXplZEtleSxcbiAgICAgICAgc2FuaXRpemVkVmFsdWUsXG4gICAgICAgIFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2VcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuYWJsZSB0byBpbmplY3QgdGhlbWUgdmFyaWFibGUnKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1ByZS1zYW5pdGl6ZWQga2V5IC8gdmFsdWUgIC0gJyArIGtleSArICc6ICcgKyB2YWx1ZSk7XG4gICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIHNhbml0aXplIGtleSAtICcgKyBzYW5pdGl6ZWRLZXkgPT0gbnVsbCk7XG4gICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIHNhbml0aXplIHZhbHVlIC0gJyArIHNhbml0aXplZFZhbHVlID09IG51bGwpO1xuICAgIH1cbiAgfVxufVxuIl19