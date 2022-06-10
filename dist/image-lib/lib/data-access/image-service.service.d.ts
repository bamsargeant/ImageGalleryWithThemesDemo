import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'UtilsLib';
import { ImageInfo } from '../models/image-info.model';
import { ImageUrl } from '../models/image-url.model';
import * as i0 from "@angular/core";
export declare class ImageService {
    private http;
    private env;
    imageList$: BehaviorSubject<Array<ImageInfo>>;
    imageInfo$: BehaviorSubject<ImageInfo | undefined>;
    image$: BehaviorSubject<string | undefined>;
    constructor(http: HttpClient, env: Environment);
    retrieveImage(image: Partial<ImageUrl>): import("rxjs").Subscription;
    inspectImage(image: ImageInfo): void;
    retrieveImageInfo(image: Partial<ImageUrl>): import("rxjs").Subscription;
    retrieveList(thumbnailWidth?: number, thumbnailHeight?: number, page?: number | undefined, limit?: number | undefined, version?: string): void;
    private buildImageUrl;
    private buildImageUrlParams;
    private buildInfoUrl;
    private buildListUrl;
    private setMaxDimension;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ImageService>;
}
