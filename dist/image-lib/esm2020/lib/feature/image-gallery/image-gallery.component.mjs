import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../data-access/image-service.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "../../ui/card/card.component";
export class ImageGalleryComponent {
    constructor(imageService, router, route) {
        this.imageService = imageService;
        this.router = router;
        this.route = route;
        this.imageList = [];
        this.loadMoreCounter = 0;
        this.page = 1;
        this.limit = 5;
        this.thumbnailWidth = 419;
        this.thumbnailHeight = 280;
        this.appendImages = false;
        this.imageListSubscription$ = this.imageService.imageList$.subscribe((e) => {
            // continuously add to the list
            if (this.appendImages) {
                this.imageList.push(...e);
            }
            else {
                this.imageList = e;
                this.appendImages = true;
            }
            this.imageList = this.imageList.sort((a, b) => a.id.localeCompare(b.id));
        });
    }
    ngOnInit() {
        const pageParam = Number(this.route.snapshot.queryParamMap.get('page'));
        if (pageParam)
            this.page = pageParam;
        const limitParam = Number(this.route.snapshot.queryParamMap.get('limit'));
        if (limitParam)
            this.limit = limitParam;
        const loadMoreCounterParam = Number(this.route.snapshot.queryParamMap.get('load'));
        if (loadMoreCounterParam)
            this.loadMoreCounter = loadMoreCounterParam;
        this.loadImages(false, 0);
    }
    ngOnDestroy() {
        if (this.imageListSubscription$) {
            this.imageListSubscription$.unsubscribe();
        }
    }
    viewImage(imageInfo) {
        console.log('View Image');
        this.imageService.inspectImage(imageInfo);
        this.router.navigate(['/', imageInfo.id], {
            queryParams: {
                page: this.page,
                limit: this.limit,
                load: this.loadMoreCounter,
            },
        });
    }
    loadImages(appendImages = false, loadCount = this.loadMoreCounter) {
        this.appendImages = appendImages;
        for (let index = loadCount; index <= this.loadMoreCounter; index++) {
            this.imageService.retrieveList(this.thumbnailWidth, this.thumbnailHeight, this.page + index, this.limit);
        }
    }
    loadMore() {
        this.loadMoreCounter++;
        this.loadImages(true);
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                page: this.page,
                limit: this.limit,
                load: this.loadMoreCounter,
            },
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    }
    next() {
        this.page += this.loadMoreCounter + 1;
        this.loadMoreCounter = 0;
        this.loadImages(false, 0);
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                page: this.page,
                limit: this.limit,
                load: this.loadMoreCounter,
            },
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    }
    previous() {
        if (this.page > 1) {
            this.page--;
        }
        this.loadMoreCounter = 0;
        this.loadImages(false, 0);
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                page: this.page,
                limit: this.limit,
                load: this.loadMoreCounter,
            },
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    }
}
ImageGalleryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageGalleryComponent, deps: [{ token: i1.ImageService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
ImageGalleryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: ImageGalleryComponent, selector: "img-lib-image-gallery", ngImport: i0, template: "<div class=\"container py-3\">\r\n    <div class=\"row row-cols-auto justify-content-center g-3 mb-3\">\r\n        <div class=\"col-12\">\r\n            <div class=\"row row-cols-auto justify-content-center g-3\">\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"previous()\">Previous</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"loadMore()\">Load More</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"next()\">Next</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    \r\n    <div class=\"row row-cols-auto justify-content-center g-3\">\r\n        <div *ngFor=\"let imageInfo of imageList\" class=\"col\">\r\n            <img-lib-card [path]=\"imageInfo.thumbnail_url\" [imgInfo]=\"imageInfo\" (click)=\"viewImage(imageInfo)\" class=\"cursor-pointer\"></img-lib-card>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row row-cols-auto justify-content-center g-3 mt-3\">\r\n        <div class=\"col-12\">\r\n            <div class=\"row row-cols-auto justify-content-center g-3\">\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"previous()\">Previous</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"loadMore()\">Load More</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"next()\">Next</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".btn-colour{color:var(--btn-text-colour);background-color:var(--btn-background-colour)}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i4.CardComponent, selector: "img-lib-card", inputs: ["path", "alttext", "imgInfo"], outputs: ["click"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageGalleryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'img-lib-image-gallery', template: "<div class=\"container py-3\">\r\n    <div class=\"row row-cols-auto justify-content-center g-3 mb-3\">\r\n        <div class=\"col-12\">\r\n            <div class=\"row row-cols-auto justify-content-center g-3\">\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"previous()\">Previous</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"loadMore()\">Load More</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"next()\">Next</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    \r\n    <div class=\"row row-cols-auto justify-content-center g-3\">\r\n        <div *ngFor=\"let imageInfo of imageList\" class=\"col\">\r\n            <img-lib-card [path]=\"imageInfo.thumbnail_url\" [imgInfo]=\"imageInfo\" (click)=\"viewImage(imageInfo)\" class=\"cursor-pointer\"></img-lib-card>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row row-cols-auto justify-content-center g-3 mt-3\">\r\n        <div class=\"col-12\">\r\n            <div class=\"row row-cols-auto justify-content-center g-3\">\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"previous()\">Previous</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"loadMore()\">Load More</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"next()\">Next</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".btn-colour{color:var(--btn-text-colour);background-color:var(--btn-background-colour)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ImageService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pbWFnZS1saWIvc3JjL2xpYi9mZWF0dXJlL2ltYWdlLWdhbGxlcnkvaW1hZ2UtZ2FsbGVyeS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pbWFnZS1saWIvc3JjL2xpYi9mZWF0dXJlL2ltYWdlLWdhbGxlcnkvaW1hZ2UtZ2FsbGVyeS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBVzdELE1BQU0sT0FBTyxxQkFBcUI7SUFZaEMsWUFDVSxZQUEwQixFQUMxQixNQUFjLEVBQ2QsS0FBcUI7UUFGckIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBZHhCLGNBQVMsR0FBcUIsRUFBRSxDQUFDO1FBSWhDLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixtQkFBYyxHQUFXLEdBQUcsQ0FBQztRQUM3QixvQkFBZSxHQUFXLEdBQUcsQ0FBQztRQUM5QixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQU9uQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUNsRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ0osK0JBQStCO1lBQy9CLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMs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cUJBQXFCLDZEQ1hsQyx5M0RBc0NNOzJGRDNCTyxxQkFBcUI7a0JBTGpDLFNBQVM7K0JBQ0UsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW1hZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YS1hY2Nlc3MvaW1hZ2Utc2VydmljZS5zZXJ2aWNlJztcbmltcG9ydCB7IEltYWdlSW5mbyB9IGZyb20gJy4uLy4uL21vZGVscy9pbWFnZS1pbmZvLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW1nLWxpYi1pbWFnZS1nYWxsZXJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ltYWdlLWdhbGxlcnkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pbWFnZS1nYWxsZXJ5LmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlR2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHVibGljIGltYWdlTGlzdDogQXJyYXk8SW1hZ2VJbmZvPiA9IFtdO1xuXG4gIHB1YmxpYyBpbWFnZUxpc3RTdWJzY3JpcHRpb24kITogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgbG9hZE1vcmVDb3VudGVyOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgcGFnZTogbnVtYmVyID0gMTtcbiAgcHVibGljIGxpbWl0OiBudW1iZXIgPSA1O1xuICBwdWJsaWMgdGh1bWJuYWlsV2lkdGg6IG51bWJlciA9IDQxOTtcbiAgcHVibGljIHRodW1ibmFpbEhlaWdodDogbnVtYmVyID0gMjgwO1xuICBwdWJsaWMgYXBwZW5kSW1hZ2VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpbWFnZVNlcnZpY2U6IEltYWdlU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICkge1xuICAgIHRoaXMuaW1hZ2VMaXN0U3Vic2NyaXB0aW9uJCA9IHRoaXMuaW1hZ2VTZXJ2aWNlLmltYWdlTGlzdCQuc3Vic2NyaWJlKFxuICAgICAgKGUpID0+IHtcbiAgICAgICAgLy8gY29udGludW91c2x5IGFkZCB0byB0aGUgbGlzdFxuICAgICAgICBpZiAodGhpcy5hcHBlbmRJbWFnZXMpIHtcbiAgICAgICAgICB0aGlzLmltYWdlTGlzdC5wdXNoKC4uLmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaW1hZ2VMaXN0ID0gZTtcbiAgICAgICAgICB0aGlzLmFwcGVuZEltYWdlcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmltYWdlTGlzdCA9IHRoaXMuaW1hZ2VMaXN0LnNvcnQoKGEsIGIpID0+XG4gICAgICAgICAgYS5pZC5sb2NhbGVDb21wYXJlKGIuaWQpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHBhZ2VQYXJhbSA9IE51bWJlcih0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1NYXAuZ2V0KCdwYWdlJykpO1xuICAgIGlmIChwYWdlUGFyYW0pIHRoaXMucGFnZSA9IHBhZ2VQYXJhbTtcblxuICAgIGNvbnN0IGxpbWl0UGFyYW0gPSBOdW1iZXIodGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtTWFwLmdldCgnbGltaXQnKSk7XG4gICAgaWYgKGxpbWl0UGFyYW0pIHRoaXMubGltaXQgPSBsaW1pdFBhcmFtO1xuXG4gICAgY29uc3QgbG9hZE1vcmVDb3VudGVyUGFyYW0gPSBOdW1iZXIoXG4gICAgICB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1NYXAuZ2V0KCdsb2FkJylcbiAgICApO1xuICAgIGlmIChsb2FkTW9yZUNvdW50ZXJQYXJhbSkgdGhpcy5sb2FkTW9yZUNvdW50ZXIgPSBsb2FkTW9yZUNvdW50ZXJQYXJhbTtcblxuICAgIHRoaXMubG9hZEltYWdlcyhmYWxzZSwgMCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbWFnZUxpc3RTdWJzY3JpcHRpb24kKSB7XG4gICAgICB0aGlzLmltYWdlTGlzdFN1YnNjcmlwdGlvbiQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdmlld0ltYWdlKGltYWdlSW5mbzogYW55KSB7XG4gICAgY29uc29sZS5sb2coJ1ZpZXcgSW1hZ2UnKTtcbiAgICB0aGlzLmltYWdlU2VydmljZS5pbnNwZWN0SW1hZ2UoaW1hZ2VJbmZvKTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nLCBpbWFnZUluZm8uaWRdLCB7XG4gICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgICBsb2FkOiB0aGlzLmxvYWRNb3JlQ291bnRlcixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbG9hZEltYWdlcyhcbiAgICBhcHBlbmRJbWFnZXM6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBsb2FkQ291bnQ6IG51bWJlciA9IHRoaXMubG9hZE1vcmVDb3VudGVyXG4gICkge1xuICAgIHRoaXMuYXBwZW5kSW1hZ2VzID0gYXBwZW5kSW1hZ2VzO1xuXG4gICAgZm9yIChsZXQgaW5kZXggPSBsb2FkQ291bnQ7IGluZGV4IDw9IHRoaXMubG9hZE1vcmVDb3VudGVyOyBpbmRleCsrKSB7XG4gICAgICB0aGlzLmltYWdlU2VydmljZS5yZXRyaWV2ZUxpc3QoXG4gICAgICAgIHRoaXMudGh1bWJuYWlsV2lkdGgsXG4gICAgICAgIHRoaXMudGh1bWJuYWlsSGVpZ2h0LFxuICAgICAgICB0aGlzLnBhZ2UgKyBpbmRleCxcbiAgICAgICAgdGhpcy5saW1pdFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbG9hZE1vcmUoKSB7XG4gICAgdGhpcy5sb2FkTW9yZUNvdW50ZXIrKztcbiAgICB0aGlzLmxvYWRJbWFnZXModHJ1ZSk7XG5cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXSwge1xuICAgICAgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICAgIGxvYWQ6IHRoaXMubG9hZE1vcmVDb3VudGVyLFxuICAgICAgfSxcbiAgICAgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6ICdtZXJnZScsIC8vIHJlbW92ZSB0byByZXBsYWNlIGFsbCBxdWVyeSBwYXJhbXMgYnkgcHJvdmlkZWRcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0KCkge1xuICAgIHRoaXMucGFnZSArPSB0aGlzLmxvYWRNb3JlQ291bnRlciArIDE7XG4gICAgdGhpcy5sb2FkTW9yZUNvdW50ZXIgPSAwO1xuICAgIHRoaXMubG9hZEltYWdlcyhmYWxzZSwgMCk7XG5cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXSwge1xuICAgICAgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICAgIGxvYWQ6IHRoaXMubG9hZE1vcmVDb3VudGVyLFxuICAgICAgfSxcbiAgICAgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6ICdtZXJnZScsIC8vIHJlbW92ZSB0byByZXBsYWNlIGFsbCBxdWVyeSBwYXJhbXMgYnkgcHJvdmlkZWRcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2aW91cygpIHtcbiAgICBpZiAodGhpcy5wYWdlID4gMSkge1xuICAgICAgdGhpcy5wYWdlLS07XG4gICAgfVxuICAgIHRoaXMubG9hZE1vcmVDb3VudGVyID0gMDtcblxuICAgIHRoaXMubG9hZEltYWdlcyhmYWxzZSwgMCk7XG5cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXSwge1xuICAgICAgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICAgIGxvYWQ6IHRoaXMubG9hZE1vcmVDb3VudGVyLFxuICAgICAgfSxcbiAgICAgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6ICdtZXJnZScsIC8vIHJlbW92ZSB0byByZXBsYWNlIGFsbCBxdWVyeSBwYXJhbXMgYnkgcHJvdmlkZWRcbiAgICB9KTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNvbnRhaW5lciBweS0zXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy1jb2xzLWF1dG8ganVzdGlmeS1jb250ZW50LWNlbnRlciBnLTMgbWItM1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctY29scy1hdXRvIGp1c3RpZnktY29udGVudC1jZW50ZXIgZy0zXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWNvbG91clwiIChjbGljayk9XCJwcmV2aW91cygpXCI+UHJldmlvdXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1jb2xvdXJcIiAoY2xpY2spPVwibG9hZE1vcmUoKVwiPkxvYWQgTW9yZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWNvbG91clwiIChjbGljayk9XCJuZXh0KClcIj5OZXh0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgPGRpdiBjbGFzcz1cInJvdyByb3ctY29scy1hdXRvIGp1c3RpZnktY29udGVudC1jZW50ZXIgZy0zXCI+XHJcbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaW1hZ2VJbmZvIG9mIGltYWdlTGlzdFwiIGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICAgIDxpbWctbGliLWNhcmQgW3BhdGhdPVwiaW1hZ2VJbmZvLnRodW1ibmFpbF91cmxcIiBbaW1nSW5mb109XCJpbWFnZUluZm9cIiAoY2xpY2spPVwidmlld0ltYWdlKGltYWdlSW5mbylcIiBjbGFzcz1cImN1cnNvci1wb2ludGVyXCI+PC9pbWctbGliLWNhcmQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy1jb2xzLWF1dG8ganVzdGlmeS1jb250ZW50LWNlbnRlciBnLTMgbXQtM1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctY29scy1hdXRvIGp1c3RpZnktY29udGVudC1jZW50ZXIgZy0zXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWNvbG91clwiIChjbGljayk9XCJwcmV2aW91cygpXCI+UHJldmlvdXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1jb2xvdXJcIiAoY2xpY2spPVwibG9hZE1vcmUoKVwiPkxvYWQgTW9yZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWNvbG91clwiIChjbGljayk9XCJuZXh0KClcIj5OZXh0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+Il19