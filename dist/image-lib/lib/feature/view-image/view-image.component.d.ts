import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../data-access/image-service.service';
import { ImageInfo } from '../../models/image-info.model';
import * as i0 from "@angular/core";
export declare class ViewImageComponent implements OnInit, OnDestroy {
    private imageService;
    private router;
    private route;
    imageInfo: ImageInfo | undefined;
    imgSrc: string;
    private id;
    private cachedImageInfo;
    private imageInfoSubscription$;
    private pageParam;
    private limitParam;
    private loadMoreCounterParam;
    constructor(imageService: ImageService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    ngOnDestroy(): void;
    loadImage(): void;
    backToList(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewImageComponent, "img-lib-view-image", never, {}, {}, never, never, false>;
}
