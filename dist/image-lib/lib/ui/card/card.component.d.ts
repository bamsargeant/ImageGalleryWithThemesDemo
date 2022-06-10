import { EventEmitter, OnInit } from '@angular/core';
import { ImageInfo } from '../../models/image-info.model';
import * as i0 from "@angular/core";
export declare class CardComponent implements OnInit {
    path: string;
    alttext: string;
    imgInfo: ImageInfo | undefined;
    click: EventEmitter<any>;
    onClick(e: any): void;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardComponent, "img-lib-card", never, { "path": "path"; "alttext": "alttext"; "imgInfo": "imgInfo"; }, { "click": "click"; }, never, never, false>;
}
