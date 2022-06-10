import { NgModule } from '@angular/core';
import { ImageGalleryModule } from './feature/image-gallery/image-gallery.module';
import { BannerModule } from './ui/banner/banner.module';
import { CardModule } from './ui/card/card.module';
import { FooterModule } from './ui/footer/footer.module';
import * as i0 from "@angular/core";
export class ImageLibModule {
}
ImageLibModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageLibModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImageLibModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: ImageLibModule, imports: [BannerModule, ImageGalleryModule, FooterModule, CardModule], exports: [BannerModule, ImageGalleryModule, FooterModule, CardModule] });
ImageLibModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageLibModule, imports: [BannerModule, ImageGalleryModule, FooterModule, CardModule, BannerModule, ImageGalleryModule, FooterModule, CardModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageLibModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [BannerModule, ImageGalleryModule, FooterModule, CardModule],
                    exports: [BannerModule, ImageGalleryModule, FooterModule, CardModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbGliLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2ltYWdlLWxpYi9zcmMvbGliL2ltYWdlLWxpYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFPekQsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxZQUhmLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsVUFBVSxhQUMxRCxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxFQUFFLFVBQVU7NEdBRXpELGNBQWMsWUFIZixZQUFZLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFDMUQsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRSxVQUFVOzJGQUV6RCxjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQztvQkFDckUsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRSxVQUFVLENBQUM7aUJBQ3RFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEltYWdlR2FsbGVyeU1vZHVsZSB9IGZyb20gJy4vZmVhdHVyZS9pbWFnZS1nYWxsZXJ5L2ltYWdlLWdhbGxlcnkubW9kdWxlJztcbmltcG9ydCB7IEJhbm5lck1vZHVsZSB9IGZyb20gJy4vdWkvYmFubmVyL2Jhbm5lci5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FyZE1vZHVsZSB9IGZyb20gJy4vdWkvY2FyZC9jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBGb290ZXJNb2R1bGUgfSBmcm9tICcuL3VpL2Zvb3Rlci9mb290ZXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW0Jhbm5lck1vZHVsZSwgSW1hZ2VHYWxsZXJ5TW9kdWxlLCBGb290ZXJNb2R1bGUsIENhcmRNb2R1bGVdLFxuICBleHBvcnRzOiBbQmFubmVyTW9kdWxlLCBJbWFnZUdhbGxlcnlNb2R1bGUsIEZvb3Rlck1vZHVsZSwgQ2FyZE1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlTGliTW9kdWxlIHt9XG4iXX0=