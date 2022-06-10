import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class CardComponent {
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
CardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: CardComponent, selector: "img-lib-card", inputs: { path: "path", alttext: "alttext", imgInfo: "imgInfo" }, outputs: { click: "click" }, ngImport: i0, template: "<div class=\"card\" (click)=\"onClick($event)\">\n  <img [src]=\"path\" [alt]=\"alttext\" class=\"card-img-top\" />\n  <div *ngIf=\"imgInfo\" class=\"card-body\">\n    <div class=\"row justify-content-between\">\n      <div class=\"col-auto\">\n        <h5 class=\"card-title\">{{imgInfo.author}}</h5>\n      </div>\n      <div class=\"col-auto\">\n        <h5 class=\"card-title text-end\">{{imgInfo.id}}</h5>\n      </div>\n    </div>\n    <!-- <p class=\"card-text\">\n      {{imgInfo.author}}\n      {{imgInfo.width}} x {{imgInfo.height}}\n      {{imgInfo.url}}\n      {{imgInfo.download_url}}\n    </p> -->\n  </div>\n</div>\n", styles: [".card{box-shadow:0 4px 8px #0003;transition:.3s;border-radius:5px}img{border-radius:5px 5px 0 0;width:100%}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pbWFnZS1saWIvc3JjL2xpYi91aS9jYXJkL2NhcmQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaW1hZ2UtbGliL3NyYy9saWIvdWkvY2FyZC9jYXJkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFnQixLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFRN0YsTUFBTSxPQUFPLGFBQWE7SUFVeEI7UUFUUyxTQUFJLEdBQVcsRUFBRSxDQUFBO1FBQ2pCLFlBQU8sR0FBVyxFQUFFLENBQUE7UUFDcEIsWUFBTyxHQUEwQixTQUFTLENBQUM7UUFFMUMsVUFBSyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBSzdDLENBQUM7SUFKakIsT0FBTyxDQUFDLENBQU07UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBSUQsUUFBUTtJQUNSLENBQUM7OzBHQWJVLGFBQWE7OEZBQWIsYUFBYSxtSkNSMUIseW5CQW1CQTsyRkRYYSxhQUFhO2tCQUx6QixTQUFTOytCQUNFLGNBQWM7MEVBS2YsSUFBSTtzQkFBWixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBRUksS0FBSztzQkFBZCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbWFnZUluZm8gfSBmcm9tICcuLi8uLi9tb2RlbHMvaW1hZ2UtaW5mby5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ltZy1saWItY2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FyZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwYXRoOiBzdHJpbmcgPSAnJ1xuICBASW5wdXQoKSBhbHR0ZXh0OiBzdHJpbmcgPSAnJ1xuICBASW5wdXQoKSBpbWdJbmZvOiBJbWFnZUluZm8gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgQE91dHB1dCgpIGNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBvbkNsaWNrKGU6IGFueSkge1xuICAgIHRoaXMuY2xpY2suZW1pdChlKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxufVxuIiwiPGRpdiBjbGFzcz1cImNhcmRcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XG4gIDxpbWcgW3NyY109XCJwYXRoXCIgW2FsdF09XCJhbHR0ZXh0XCIgY2xhc3M9XCJjYXJkLWltZy10b3BcIiAvPlxuICA8ZGl2ICpuZ0lmPVwiaW1nSW5mb1wiIGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1hdXRvXCI+XG4gICAgICAgIDxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIj57e2ltZ0luZm8uYXV0aG9yfX08L2g1PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLWF1dG9cIj5cbiAgICAgICAgPGg1IGNsYXNzPVwiY2FyZC10aXRsZSB0ZXh0LWVuZFwiPnt7aW1nSW5mby5pZH19PC9oNT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gPHAgY2xhc3M9XCJjYXJkLXRleHRcIj5cbiAgICAgIHt7aW1nSW5mby5hdXRob3J9fVxuICAgICAge3tpbWdJbmZvLndpZHRofX0geCB7e2ltZ0luZm8uaGVpZ2h0fX1cbiAgICAgIHt7aW1nSW5mby51cmx9fVxuICAgICAge3tpbWdJbmZvLmRvd25sb2FkX3VybH19XG4gICAgPC9wPiAtLT5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==