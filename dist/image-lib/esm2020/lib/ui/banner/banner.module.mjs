import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { ToggleSwitchModule } from '../toggle-switch/toggle-switch.module';
import { RouterModule } from '@angular/router';
import * as i0 from "@angular/core";
export class BannerModule {
}
BannerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: BannerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BannerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: BannerModule, declarations: [BannerComponent], imports: [CommonModule,
        ToggleSwitchModule,
        RouterModule], exports: [BannerComponent] });
BannerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: BannerModule, imports: [CommonModule,
        ToggleSwitchModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: BannerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        BannerComponent
                    ],
                    imports: [
                        CommonModule,
                        ToggleSwitchModule,
                        RouterModule
                    ],
                    exports: [
                        BannerComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ltYWdlLWxpYi9zcmMvbGliL3VpL2Jhbm5lci9iYW5uZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBaUIvQyxNQUFNLE9BQU8sWUFBWTs7eUdBQVosWUFBWTswR0FBWixZQUFZLGlCQVhyQixlQUFlLGFBR2YsWUFBWTtRQUNaLGtCQUFrQjtRQUNsQixZQUFZLGFBR1osZUFBZTswR0FHTixZQUFZLFlBUnJCLFlBQVk7UUFDWixrQkFBa0I7UUFDbEIsWUFBWTsyRkFNSCxZQUFZO2tCQWJ4QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixrQkFBa0I7d0JBQ2xCLFlBQVk7cUJBQ2I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7cUJBQ2hCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCYW5uZXJDb21wb25lbnQgfSBmcm9tICcuL2Jhbm5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9nZ2xlU3dpdGNoTW9kdWxlIH0gZnJvbSAnLi4vdG9nZ2xlLXN3aXRjaC90b2dnbGUtc3dpdGNoLm1vZHVsZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQmFubmVyQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVG9nZ2xlU3dpdGNoTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQmFubmVyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQmFubmVyTW9kdWxlIHsgfVxuIl19