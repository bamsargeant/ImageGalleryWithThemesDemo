import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImageService } from '../../data-access/image-service.service';
import { ImageInfo } from '../../models/image-info.model';
import * as i0 from "@angular/core";
export declare class ImageGalleryComponent implements OnInit, OnDestroy {
    private imageService;
    private router;
    private route;
    imageList: Array<ImageInfo>;
    imageListSubscription$: Subscription;
    private loadMoreCounter;
    page: number;
    limit: number;
    thumbnailWidth: number;
    thumbnailHeight: number;
    appendImages: boolean;
    constructor(imageService: ImageService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    ngOnDestroy(): void;
    viewImage(imageInfo: any): void;
    loadImages(appendImages?: boolean, loadCount?: number): void;
    loadMore(): void;
    next(): void;
    previous(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageGalleryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImageGalleryComponent, "img-lib-image-gallery", never, {}, {}, never, never, false>;
}
