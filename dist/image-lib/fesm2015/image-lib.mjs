import * as i0 from '@angular/core';
import { SecurityContext, RendererStyleFlags2, Injectable, Inject, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import * as i1 from '@angular/platform-browser';
import * as i1$1 from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { ENVIRONMENT } from 'UtilsLib';
import * as i2 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$2 from '@angular/forms';
import { FormsModule } from '@angular/forms';

const light = {
    name: "light",
    properties: {
        "--foreground-default": "#08090A",
        "--foreground-secondary": "#41474D",
        "--foreground-tertiary": "#797C80",
        "--foreground-quaternary": "#F4FAFF",
        "--foreground-light": "#41474D",
        "--background-default": "#F4FAFF",
        "--background-secondary": "#A3B9CC",
        "--background-tertiary": "#5C7D99",
        "--background-light": "#FFFFFF",
        "--primary-default": "#5DFDCB",
        "--primary-dark": "#24B286",
        "--primary-light": "#B2FFE7",
        "--error-default": "#EF3E36",
        "--error-dark": "#800600",
        "--error-light": "#FFCECC",
        "--background-tertiary-shadow": "0 1px 3px 0 rgba(92, 125, 153, 0.5)",
        "--slide-toggle-padding": "2px",
        "--slide-toggle-width": "30px",
        "--slide-toggle-height": "calc(var(--slide-toggle-width) / 2 + var(--slide-toggle-padding))",
        "--slide-toggle-background-colour": "#15273b",
        "--slide-toggle-background-colour-selected": "#ccc",
        "--btn-text-colour": "#08090A",
        "--btn-background-colour": "#ccc"
    }
};
const dark = {
    name: "dark",
    properties: {
        "--foreground-default": "#5C7D99",
        "--foreground-secondary": "#A3B9CC",
        "--foreground-tertiary": "#F4FAFF",
        "--foreground-quaternary": "#E5E5E5",
        "--foreground-light": "#FFFFFF",
        "--background-default": "#797C80",
        "--background-secondary": "#41474D",
        "--background-tertiary": "#08090A",
        "--background-light": "#41474D",
        "--primary-default": "#5DFDCB",
        "--primary-dark": "#24B286",
        "--primary-light": "#B2FFE7",
        "--error-default": "#EF3E36",
        "--error-dark": "#800600",
        "--error-light": "#FFCECC",
        "--background-tertiary-shadow": "0 1px 3px 0 rgba(8, 9, 10, 0.5)",
        "--slide-toggle-padding": "2px",
        "--slide-toggle-width": "30px",
        "--slide-toggle-height": "calc(var(--slide-toggle-width) / 2 + var(--slide-toggle-padding))",
        "--slide-toggle-background-colour": "#ccc",
        "--slide-toggle-background-colour-selected": "#15273b",
        "--btn-text-colour": "#ccc",
        "--btn-background-colour": "#08090A"
    }
};

class ThemeService {
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

class ImageService {
    constructor(http, env) {
        this.http = http;
        this.env = env;
        this.imageList$ = new BehaviorSubject([]);
        this.imageInfo$ = new BehaviorSubject(undefined);
        this.image$ = new BehaviorSubject(undefined);
    }
    retrieveImage(image) {
        const url = this.buildImageUrl(image);
        const params = this.buildImageUrlParams(image);
        return this.http.get(url, { params }).subscribe((imgUrl) => {
            this.image$.next(imgUrl);
        });
    }
    inspectImage(image) {
        this.imageInfo$.next(image);
    }
    retrieveImageInfo(image) {
        const url = this.buildInfoUrl(image);
        return this.http.get(url).subscribe((imgInfo) => {
            this.imageInfo$.next(imgInfo);
        });
    }
    retrieveList(thumbnailWidth = 420, thumbnailHeight = 280, page = undefined, limit = undefined, version = 'v2') {
        let params = new HttpParams();
        if (page) {
            params = params.append('page', page);
        }
        if (limit) {
            params = params.append('limit', limit);
        }
        const url = this.buildListUrl(version);
        this.http.get(url, { params }).subscribe((imgList) => {
            imgList.forEach((imgInfo) => {
                imgInfo.thumbnail_url = this.buildImageUrl({
                    id: imgInfo.id,
                    width: thumbnailWidth,
                    height: thumbnailHeight,
                    maxWidth: imgInfo.width,
                    maxHeight: imgInfo.height,
                });
            });
            this.imageList$.next(imgList);
        });
    }
    // build the Get Image url
    buildImageUrl(image) {
        let urlRoutes = [this.env.imageServiceUrl];
        // define if the image is specified
        if (image.id) {
            urlRoutes.push('id', image.id);
        }
        // else, define if the url is using a random seed
        else if (image.seed) {
            urlRoutes.push('seed', image.seed);
        }
        // define the image width
        if (image.width) {
            // ensure max dimensions not reached
            if (image.maxWidth) {
                image.width = this.setMaxDimension(image.width, image.maxWidth);
            }
            urlRoutes.push(image.width.toString());
            // if no height is defined, the image will be square
            if (image.height) {
                // ensure max dimensions not reached
                if (image.maxHeight) {
                    image.height = this.setMaxDimension(image.height, image.maxHeight);
                }
                urlRoutes.push(image.height.toString());
            }
        }
        // join the url routes together
        let imageUrl = urlRoutes.join('/');
        // add the image type to the end of the url (without a /)
        // must not be searching for image info
        if (image.type) {
            imageUrl = imageUrl.concat(image.type);
        }
        return imageUrl;
        // encode the url
        // return encodeURIComponent(imageUrl);
    }
    // build the Get Image params
    buildImageUrlParams(image) {
        var _a;
        let params = new HttpParams();
        if (image.grayscale) {
            params = params.append('grayscale', '');
        }
        // blur default value is 5
        if (image.blur) {
            const blurValue = (_a = image.blurValue) !== null && _a !== void 0 ? _a : '';
            params = params.append('blur', blurValue.toString());
        }
        // add random query to prevent caching
        if (image.random) {
            params = params.append('random', image.random);
        }
        return params;
    }
    // build the Get Image url
    buildInfoUrl(image) {
        let urlRoutes = [this.env.imageServiceUrl];
        // define if the image is specified
        if (image.id) {
            urlRoutes.push('id', image.id);
        }
        // add the info route
        urlRoutes.push('info');
        // join the url routes together
        let imageUrl = urlRoutes.join('/');
        return imageUrl;
        // encode the url
        // return encodeURIComponent(imageUrl);
    }
    // build the Get List url
    buildListUrl(version) {
        let urlRoutes = [this.env.imageServiceUrl];
        urlRoutes.push(version);
        urlRoutes.push('list');
        // join the url routes together
        let url = urlRoutes.join('/');
        return url;
        // encode the url
        // return encodeURIComponent(url);
    }
    // make sure the image dimension is not larger than the max dimension
    // make sure the dimension is not a negative value
    setMaxDimension(dimension, maxDimension) {
        return Math.abs(dimension) <= Math.abs(maxDimension)
            ? Math.abs(dimension)
            : Math.abs(maxDimension);
    }
}
ImageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageService, deps: [{ token: i1$1.HttpClient }, { token: ENVIRONMENT }], target: i0.ɵɵFactoryTarget.Injectable });
ImageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: i1$1.HttpClient }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [ENVIRONMENT]
                    }] }];
    } });

class CardComponent {
    constructor() {
        this.path = '';
        this.alttext = '';
        this.imgInfo = undefined;
        this.click = new EventEmitter();
    }
    onClick(e) {
        this.click.emit(e);
    }
    ngOnInit() {
    }
}
CardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: CardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: CardComponent, selector: "img-lib-card", inputs: { path: "path", alttext: "alttext", imgInfo: "imgInfo" }, outputs: { click: "click" }, ngImport: i0, template: "<div class=\"card\" (click)=\"onClick($event)\">\n  <img [src]=\"path\" [alt]=\"alttext\" class=\"card-img-top\" />\n  <div *ngIf=\"imgInfo\" class=\"card-body\">\n    <div class=\"row justify-content-between\">\n      <div class=\"col-auto\">\n        <h5 class=\"card-title\">{{imgInfo.author}}</h5>\n      </div>\n      <div class=\"col-auto\">\n        <h5 class=\"card-title text-end\">{{imgInfo.id}}</h5>\n      </div>\n    </div>\n    <!-- <p class=\"card-text\">\n      {{imgInfo.author}}\n      {{imgInfo.width}} x {{imgInfo.height}}\n      {{imgInfo.url}}\n      {{imgInfo.download_url}}\n    </p> -->\n  </div>\n</div>\n", styles: [".card{box-shadow:0 4px 8px #0003;transition:.3s;border-radius:5px}img{border-radius:5px 5px 0 0;width:100%}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: CardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'img-lib-card', template: "<div class=\"card\" (click)=\"onClick($event)\">\n  <img [src]=\"path\" [alt]=\"alttext\" class=\"card-img-top\" />\n  <div *ngIf=\"imgInfo\" class=\"card-body\">\n    <div class=\"row justify-content-between\">\n      <div class=\"col-auto\">\n        <h5 class=\"card-title\">{{imgInfo.author}}</h5>\n      </div>\n      <div class=\"col-auto\">\n        <h5 class=\"card-title text-end\">{{imgInfo.id}}</h5>\n      </div>\n    </div>\n    <!-- <p class=\"card-text\">\n      {{imgInfo.author}}\n      {{imgInfo.width}} x {{imgInfo.height}}\n      {{imgInfo.url}}\n      {{imgInfo.download_url}}\n    </p> -->\n  </div>\n</div>\n", styles: [".card{box-shadow:0 4px 8px #0003;transition:.3s;border-radius:5px}img{border-radius:5px 5px 0 0;width:100%}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { path: [{
                type: Input
            }], alttext: [{
                type: Input
            }], imgInfo: [{
                type: Input
            }], click: [{
                type: Output
            }] } });

class ImageGalleryComponent {
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
ImageGalleryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageGalleryComponent, deps: [{ token: ImageService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
ImageGalleryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: ImageGalleryComponent, selector: "img-lib-image-gallery", ngImport: i0, template: "<div class=\"container py-3\">\r\n    <div class=\"row row-cols-auto justify-content-center g-3 mb-3\">\r\n        <div class=\"col-12\">\r\n            <div class=\"row row-cols-auto justify-content-center g-3\">\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"previous()\">Previous</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"loadMore()\">Load More</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"next()\">Next</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    \r\n    <div class=\"row row-cols-auto justify-content-center g-3\">\r\n        <div *ngFor=\"let imageInfo of imageList\" class=\"col\">\r\n            <img-lib-card [path]=\"imageInfo.thumbnail_url\" [imgInfo]=\"imageInfo\" (click)=\"viewImage(imageInfo)\" class=\"cursor-pointer\"></img-lib-card>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row row-cols-auto justify-content-center g-3 mt-3\">\r\n        <div class=\"col-12\">\r\n            <div class=\"row row-cols-auto justify-content-center g-3\">\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"previous()\">Previous</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"loadMore()\">Load More</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"next()\">Next</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".btn-colour{color:var(--btn-text-colour);background-color:var(--btn-background-colour)}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: CardComponent, selector: "img-lib-card", inputs: ["path", "alttext", "imgInfo"], outputs: ["click"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageGalleryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'img-lib-image-gallery', template: "<div class=\"container py-3\">\r\n    <div class=\"row row-cols-auto justify-content-center g-3 mb-3\">\r\n        <div class=\"col-12\">\r\n            <div class=\"row row-cols-auto justify-content-center g-3\">\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"previous()\">Previous</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"loadMore()\">Load More</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"next()\">Next</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    \r\n    <div class=\"row row-cols-auto justify-content-center g-3\">\r\n        <div *ngFor=\"let imageInfo of imageList\" class=\"col\">\r\n            <img-lib-card [path]=\"imageInfo.thumbnail_url\" [imgInfo]=\"imageInfo\" (click)=\"viewImage(imageInfo)\" class=\"cursor-pointer\"></img-lib-card>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row row-cols-auto justify-content-center g-3 mt-3\">\r\n        <div class=\"col-12\">\r\n            <div class=\"row row-cols-auto justify-content-center g-3\">\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"previous()\">Previous</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"loadMore()\">Load More</button>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button type=\"button\" class=\"btn btn-colour\" (click)=\"next()\">Next</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".btn-colour{color:var(--btn-text-colour);background-color:var(--btn-background-colour)}\n"] }]
        }], ctorParameters: function () { return [{ type: ImageService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; } });

class CardModule {
}
CardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: CardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: CardModule, declarations: [CardComponent], imports: [CommonModule], exports: [CardComponent] });
CardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: CardModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: CardModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        CardComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        CardComponent
                    ]
                }]
        }] });

class ImageGalleryModule {
}
ImageGalleryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageGalleryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImageGalleryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: ImageGalleryModule, declarations: [ImageGalleryComponent], imports: [CommonModule, CardModule, RouterModule], exports: [ImageGalleryComponent] });
ImageGalleryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageGalleryModule, imports: [CommonModule, CardModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageGalleryModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ImageGalleryComponent],
                    imports: [CommonModule, CardModule, RouterModule],
                    exports: [ImageGalleryComponent],
                }]
        }] });

class ViewImageComponent {
    constructor(imageService, router, route) {
        this.imageService = imageService;
        this.router = router;
        this.route = route;
        this.imgSrc = '';
    }
    ngOnInit() {
        this.pageParam = Number(this.route.snapshot.queryParamMap.get('page'));
        this.limitParam = Number(this.route.snapshot.queryParamMap.get('limit'));
        this.loadMoreCounterParam = Number(this.route.snapshot.queryParamMap.get('load'));
        this.imageInfoSubscription$ = this.imageService.imageInfo$.subscribe((result) => {
            this.imageInfo = result;
            this.imgSrc = (result === null || result === void 0 ? void 0 : result.download_url) || '';
        });
    }
    ngOnDestroy() {
        if (this.imageInfoSubscription$) {
            this.imageInfoSubscription$.unsubscribe();
        }
    }
    loadImage() {
        this.imageService.imageInfo$.pipe(map((imageInfoResult) => {
            this.imageInfo = imageInfoResult;
        }));
        if (this.cachedImageInfo && this.cachedImageInfo.id == this.id) {
            this.imageInfo = this.cachedImageInfo;
        }
        else {
            this.imageService.retrieveImageInfo({ id: this.id });
        }
    }
    backToList() {
        this.router.navigate(['/'], {
            queryParams: { page: this.pageParam, limit: this.limitParam, load: this.loadMoreCounterParam },
        });
    }
}
ViewImageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ViewImageComponent, deps: [{ token: ImageService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
ViewImageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: ViewImageComponent, selector: "img-lib-view-image", ngImport: i0, template: "<div class=\"container py-3\">\n\n  <div class=\"row row-cols-auto justify-content-center g-3 mb-3\">\n    <div class=\"col-12\">\n        <div class=\"row row-cols-auto justify-content-start g-3\">\n            <div class=\"col\">\n              <button type=\"button\" class=\"btn btn-colour\" (click)=\"backToList()\">Back</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n  <div class=\"row row-cols-auto justify-content-center g-3\">\n    <div class=\"col\">\n      <img-lib-card\n        *ngIf=\"imageInfo\"\n        [path]=\"imgSrc\"\n        [imgInfo]=\"imageInfo\"\n      ></img-lib-card>\n    </div>\n  </div>\n</div>\n", styles: [".btn-colour{color:var(--btn-text-colour);background-color:var(--btn-background-colour)}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CardComponent, selector: "img-lib-card", inputs: ["path", "alttext", "imgInfo"], outputs: ["click"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ViewImageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'img-lib-view-image', template: "<div class=\"container py-3\">\n\n  <div class=\"row row-cols-auto justify-content-center g-3 mb-3\">\n    <div class=\"col-12\">\n        <div class=\"row row-cols-auto justify-content-start g-3\">\n            <div class=\"col\">\n              <button type=\"button\" class=\"btn btn-colour\" (click)=\"backToList()\">Back</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n  <div class=\"row row-cols-auto justify-content-center g-3\">\n    <div class=\"col\">\n      <img-lib-card\n        *ngIf=\"imageInfo\"\n        [path]=\"imgSrc\"\n        [imgInfo]=\"imageInfo\"\n      ></img-lib-card>\n    </div>\n  </div>\n</div>\n", styles: [".btn-colour{color:var(--btn-text-colour);background-color:var(--btn-background-colour)}\n"] }]
        }], ctorParameters: function () { return [{ type: ImageService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; } });

class ViewImageModule {
}
ViewImageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ViewImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewImageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: ViewImageModule, declarations: [ViewImageComponent], imports: [CommonModule, CardModule, RouterModule], exports: [ViewImageComponent] });
ViewImageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ViewImageModule, imports: [CommonModule, CardModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ViewImageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ViewImageComponent],
                    imports: [CommonModule, CardModule, RouterModule],
                    exports: [ViewImageComponent],
                }]
        }] });

class ToggleSwitchComponent {
    constructor() {
        this.checked = false;
        this.onCheck = new EventEmitter();
    }
    changeChecked() {
        this.onCheck.emit(this.checked);
    }
}
ToggleSwitchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ToggleSwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ToggleSwitchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: ToggleSwitchComponent, selector: "img-lib-toggle-switch", inputs: { checked: "checked" }, outputs: { onCheck: "onCheck" }, ngImport: i0, template: "<label class=\"switch-wrap\">\n  <input type=\"checkbox\" [(ngModel)]=\"checked\" (change)=\"changeChecked()\"/>\n  <div class=\"switch\"></div>\n</label>\n\n\n<!-- <label class=\"switch-wrap\">\n  <input type=\"checkbox\" />\n  <div class=\"switch\"></div>\n</label> -->", styles: [".switch-wrap{cursor:pointer;background:var(--slide-toggle-background-colour);padding:var(--slide-toggle-padding);width:var(--slide-toggle-width);height:var(--slide-toggle-height);border-radius:calc(var(--slide-toggle-height) / 2)}.switch-wrap input{position:absolute;opacity:0;width:0;height:0}.switch{height:100%;display:grid;grid-template-columns:0fr 1fr 1fr;transition:.2s}.switch:after{content:\"\";border-radius:50%;background:var(--slide-toggle-background-colour-selected);grid-column:2;transition:background .2s}input:checked+.switch{grid-template-columns:1fr 1fr 0fr}\n"], dependencies: [{ kind: "directive", type: i1$2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ToggleSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'img-lib-toggle-switch', template: "<label class=\"switch-wrap\">\n  <input type=\"checkbox\" [(ngModel)]=\"checked\" (change)=\"changeChecked()\"/>\n  <div class=\"switch\"></div>\n</label>\n\n\n<!-- <label class=\"switch-wrap\">\n  <input type=\"checkbox\" />\n  <div class=\"switch\"></div>\n</label> -->", styles: [".switch-wrap{cursor:pointer;background:var(--slide-toggle-background-colour);padding:var(--slide-toggle-padding);width:var(--slide-toggle-width);height:var(--slide-toggle-height);border-radius:calc(var(--slide-toggle-height) / 2)}.switch-wrap input{position:absolute;opacity:0;width:0;height:0}.switch{height:100%;display:grid;grid-template-columns:0fr 1fr 1fr;transition:.2s}.switch:after{content:\"\";border-radius:50%;background:var(--slide-toggle-background-colour-selected);grid-column:2;transition:background .2s}input:checked+.switch{grid-template-columns:1fr 1fr 0fr}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { checked: [{
                type: Input
            }], onCheck: [{
                type: Output
            }] } });

// import { ThemeService } from 'ImageLib';
class BannerComponent {
    constructor(themeService) {
        this.themeService = themeService;
    }
    ngOnInit() { }
    get themeName() {
        return this.themeService.activeThemeName;
    }
    changeTheme(lightMode) {
        this.themeService.loadTheme(lightMode ? 'light' : 'dark');
        console.log(this.themeService.activeThemeName);
    }
}
BannerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: BannerComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
BannerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: BannerComponent, selector: "img-lib-banner", ngImport: i0, template: "<div class=\"banner py-2 d-flex justify-content-center\">\n  <div class=\"row container\">\n    <div class=\"col d-flex justify-content-start align-items-center\">\n      <h1 class=\"title-theme cursor-pointer\" routerLink=\"/\">Image Gallery</h1>\n    </div>\n    <div class=\"col d-flex justify-content-end align-items-center\">\n      <div class=\"pe-3\">\n        <i [ngClass]=\"{'contrast' : themeName == 'dark'}\" class=\"bi bi-lightbulb-off-fill dark-mode-icon\"></i>\n      </div>\n      <div class=\"theme-toggle\">\n        <img-lib-toggle-switch\n          [checked]=\"true\"\n          (onCheck)=\"changeTheme($event)\"\n        ></img-lib-toggle-switch>\n      </div>\n      <div class=\"ps-3\">\n        <i class=\"bi bi-lightbulb-fill light-mode-icon\"></i>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".banner{background:var(--foreground-default)}.theme-toggle{min-height:var(--slide-toggle-height);min-width:var(--slide-toggle-width)}.title-theme{color:var(--primary-default)}.light-mode-icon{color:#fff}.dark-mode-icon{color:gray}.dark-mode-icon.contrast{color:#252525}.cursor-pointer{cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: ToggleSwitchComponent, selector: "img-lib-toggle-switch", inputs: ["checked"], outputs: ["onCheck"] }, { kind: "directive", type: i2.RouterLink, selector: ":not(a):not(area)[routerLink]", inputs: ["queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo", "routerLink"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: BannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'img-lib-banner', template: "<div class=\"banner py-2 d-flex justify-content-center\">\n  <div class=\"row container\">\n    <div class=\"col d-flex justify-content-start align-items-center\">\n      <h1 class=\"title-theme cursor-pointer\" routerLink=\"/\">Image Gallery</h1>\n    </div>\n    <div class=\"col d-flex justify-content-end align-items-center\">\n      <div class=\"pe-3\">\n        <i [ngClass]=\"{'contrast' : themeName == 'dark'}\" class=\"bi bi-lightbulb-off-fill dark-mode-icon\"></i>\n      </div>\n      <div class=\"theme-toggle\">\n        <img-lib-toggle-switch\n          [checked]=\"true\"\n          (onCheck)=\"changeTheme($event)\"\n        ></img-lib-toggle-switch>\n      </div>\n      <div class=\"ps-3\">\n        <i class=\"bi bi-lightbulb-fill light-mode-icon\"></i>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".banner{background:var(--foreground-default)}.theme-toggle{min-height:var(--slide-toggle-height);min-width:var(--slide-toggle-width)}.title-theme{color:var(--primary-default)}.light-mode-icon{color:#fff}.dark-mode-icon{color:gray}.dark-mode-icon.contrast{color:#252525}.cursor-pointer{cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: ThemeService }]; } });

class ToggleSwitchModule {
}
ToggleSwitchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ToggleSwitchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToggleSwitchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: ToggleSwitchModule, declarations: [ToggleSwitchComponent], imports: [CommonModule, FormsModule], exports: [ToggleSwitchComponent] });
ToggleSwitchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ToggleSwitchModule, imports: [CommonModule, FormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ToggleSwitchModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ToggleSwitchComponent],
                    imports: [CommonModule, FormsModule],
                    exports: [ToggleSwitchComponent],
                }]
        }] });

class BannerModule {
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

class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
}
FooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: FooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: FooterComponent, selector: "img-lib-footer", ngImport: i0, template: "<div class=\"footer py-3 d-flex justify-content-center\">\n  <div class=\"row container\">\n    <div class=\"col-12 d-flex justify-content-center align-items-center\">\n      <h4 class=\"title-theme\">Z Ware</h4>\n    </div>\n    <div class=\"col-12 d-flex justify-content-center align-items-center\">\n      <h5 class=\"title-theme\">Created by Brett Sargeant</h5>\n    </div>\n  </div>\n</div>\n", styles: [".footer{background:var(--foreground-default)}.title-theme{color:var(--primary-default)}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: FooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'img-lib-footer', template: "<div class=\"footer py-3 d-flex justify-content-center\">\n  <div class=\"row container\">\n    <div class=\"col-12 d-flex justify-content-center align-items-center\">\n      <h4 class=\"title-theme\">Z Ware</h4>\n    </div>\n    <div class=\"col-12 d-flex justify-content-center align-items-center\">\n      <h5 class=\"title-theme\">Created by Brett Sargeant</h5>\n    </div>\n  </div>\n</div>\n", styles: [".footer{background:var(--foreground-default)}.title-theme{color:var(--primary-default)}\n"] }]
        }], ctorParameters: function () { return []; } });

class FooterModule {
}
FooterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: FooterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FooterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: FooterModule, declarations: [FooterComponent], imports: [CommonModule], exports: [FooterComponent] });
FooterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: FooterModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: FooterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        FooterComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        FooterComponent
                    ]
                }]
        }] });

class ImageLibModule {
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

/*
 * Public API Surface of image-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BannerComponent, BannerModule, CardComponent, CardModule, FooterComponent, FooterModule, ImageGalleryComponent, ImageGalleryModule, ImageLibModule, ImageService, ThemeService, ViewImageComponent, ViewImageModule };
//# sourceMappingURL=image-lib.mjs.map
