import { BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from 'UtilsLib';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ImageService {
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
        let params = new HttpParams();
        if (image.grayscale) {
            params = params.append('grayscale', '');
        }
        // blur default value is 5
        if (image.blur) {
            const blurValue = image.blurValue ?? '';
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
ImageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageService, deps: [{ token: i1.HttpClient }, { token: ENVIRONMENT }], target: i0.ɵɵFactoryTarget.Injectable });
ImageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: ImageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [ENVIRONMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Utc2VydmljZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaW1hZ2UtbGliL3NyYy9saWIvZGF0YS1hY2Nlc3MvaW1hZ2Utc2VydmljZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFHbkQsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxXQUFXLEVBQWUsTUFBTSxVQUFVLENBQUM7OztBQU9wRCxNQUFNLE9BQU8sWUFBWTtJQVl2QixZQUNVLElBQWdCLEVBQ0ssR0FBZ0I7UUFEckMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNLLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFieEMsZUFBVSxHQUFzQyxJQUFJLGVBQWUsQ0FFeEUsRUFBRSxDQUFDLENBQUM7UUFFQyxlQUFVLEdBQ2YsSUFBSSxlQUFlLENBQXdCLFNBQVMsQ0FBQyxDQUFDO1FBRWpELFdBQU0sR0FBd0MsSUFBSSxlQUFlLENBRXRFLFNBQVMsQ0FBQyxDQUFDO0lBS1YsQ0FBQztJQUVHLGFBQWEsQ0FBQyxLQUF3QjtRQUMzQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sWUFBWSxDQUFDLEtBQWdCO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxLQUF3QjtRQUMvQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVksR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sWUFBWSxDQUNqQixpQkFBeUIsR0FBRyxFQUM1QixrQkFBMEIsR0FBRyxFQUM3QixPQUEyQixTQUFTLEVBQ3BDLFFBQTRCLFNBQVMsRUFDckMsVUFBa0IsSUFBSTtRQUV0QixJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBRTlCLElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDeEM7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFtQixHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUN6QyxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7b0JBQ2QsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLE1BQU0sRUFBRSxlQUFlO29CQUN2QixRQUFRLEVBQUUsT0FBTyxDQUFDLEtBQUs7b0JBQ3ZCLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTTtpQkFDMUIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwwQkFBMEI7SUFDbEIsYUFBYSxDQUFDLEtBQXdCO1FBQzVDLElBQUksU0FBUyxHQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFMUQsbUNBQW1DO1FBQ25DLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUNaLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoQztRQUNELGlEQUFpRDthQUM1QyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDbkIsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO1FBRUQseUJBQXlCO1FBQ3pCLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNmLG9DQUFvQztZQUNwQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqRTtZQUVELFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRXZDLG9EQUFvRDtZQUNwRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLG9DQUFvQztnQkFDcEMsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFO29CQUNuQixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BFO2dCQUVELFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ3pDO1NBQ0Y7UUFFRCwrQkFBK0I7UUFDL0IsSUFBSSxRQUFRLEdBQVcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUzQyx5REFBeUQ7UUFDekQsdUNBQXVDO1FBQ3ZDLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtZQUNkLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QztRQUVELE9BQU8sUUFBUSxDQUFDO1FBQ2hCLGlCQUFpQjtRQUNqQix1Q0FBdUM7SUFDekMsQ0FBQztJQUVELDZCQUE2QjtJQUNyQixtQkFBbUIsQ0FBQyxLQUF3QjtRQUNsRCxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBRTlCLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNuQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDekM7UUFFRCwwQkFBMEI7UUFDMUIsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2QsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFDeEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsc0NBQXNDO1FBQ3RDLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELDBCQUEwQjtJQUNsQixZQUFZLENBQUMsS0FBd0I7UUFDM0MsSUFBSSxTQUFTLEdBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUxRCxtQ0FBbUM7UUFDbkMsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ1osU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2hDO1FBRUQscUJBQXFCO1FBQ3JCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkIsK0JBQStCO1FBQy9CLElBQUksUUFBUSxHQUFXLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0MsT0FBTyxRQUFRLENBQUM7UUFDaEIsaUJBQWlCO1FBQ2pCLHVDQUF1QztJQUN6QyxDQUFDO0lBRUQseUJBQXlCO0lBQ2pCLFlBQVksQ0FBQyxPQUFlO1FBQ2xDLElBQUksU0FBUyxHQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFMUQsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZCLCtCQUErQjtRQUMvQixJQUFJLEdBQUcsR0FBVyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRDLE9BQU8sR0FBRyxDQUFDO1FBQ1gsaUJBQWlCO1FBQ2pCLGtDQUFrQztJQUNwQyxDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLGtEQUFrRDtJQUMxQyxlQUFlLENBQUMsU0FBaUIsRUFBRSxZQUFvQjtRQUM3RCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7WUFDbEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdCLENBQUM7O3lHQXRMVSxZQUFZLDRDQWNiLFdBQVc7NkdBZFYsWUFBWSxjQUZYLE1BQU07MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQWVJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEVOVklST05NRU5ULCBFbnZpcm9ubWVudCB9IGZyb20gJ1V0aWxzTGliJztcbmltcG9ydCB7IEltYWdlSW5mbyB9IGZyb20gJy4uL21vZGVscy9pbWFnZS1pbmZvLm1vZGVsJztcbmltcG9ydCB7IEltYWdlVXJsIH0gZnJvbSAnLi4vbW9kZWxzL2ltYWdlLXVybC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZVNlcnZpY2Uge1xuICBwdWJsaWMgaW1hZ2VMaXN0JDogQmVoYXZpb3JTdWJqZWN0PEFycmF5PEltYWdlSW5mbz4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxcbiAgICBBcnJheTxJbWFnZUluZm8+XG4gID4oW10pO1xuXG4gIHB1YmxpYyBpbWFnZUluZm8kOiBCZWhhdmlvclN1YmplY3Q8SW1hZ2VJbmZvIHwgdW5kZWZpbmVkPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxJbWFnZUluZm8gfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbiAgcHVibGljIGltYWdlJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IHVuZGVmaW5lZD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFxuICAgIHN0cmluZyB8IHVuZGVmaW5lZFxuICA+KHVuZGVmaW5lZCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoRU5WSVJPTk1FTlQpIHByaXZhdGUgZW52OiBFbnZpcm9ubWVudFxuICApIHt9XG5cbiAgcHVibGljIHJldHJpZXZlSW1hZ2UoaW1hZ2U6IFBhcnRpYWw8SW1hZ2VVcmw+KSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5idWlsZEltYWdlVXJsKGltYWdlKTtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmJ1aWxkSW1hZ2VVcmxQYXJhbXMoaW1hZ2UpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8c3RyaW5nPih1cmwsIHsgcGFyYW1zIH0pLnN1YnNjcmliZSgoaW1nVXJsKSA9PiB7XG4gICAgICB0aGlzLmltYWdlJC5uZXh0KGltZ1VybCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaW5zcGVjdEltYWdlKGltYWdlOiBJbWFnZUluZm8pIHtcbiAgICB0aGlzLmltYWdlSW5mbyQubmV4dChpbWFnZSk7XG4gIH1cblxuICBwdWJsaWMgcmV0cmlldmVJbWFnZUluZm8oaW1hZ2U6IFBhcnRpYWw8SW1hZ2VVcmw+KSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5idWlsZEluZm9VcmwoaW1hZ2UpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8SW1hZ2VJbmZvPih1cmwpLnN1YnNjcmliZSgoaW1nSW5mbykgPT4ge1xuICAgICAgdGhpcy5pbWFnZUluZm8kLm5leHQoaW1nSW5mbyk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcmV0cmlldmVMaXN0KFxuICAgIHRodW1ibmFpbFdpZHRoOiBudW1iZXIgPSA0MjAsXG4gICAgdGh1bWJuYWlsSGVpZ2h0OiBudW1iZXIgPSAyODAsXG4gICAgcGFnZTogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLFxuICAgIGxpbWl0OiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXG4gICAgdmVyc2lvbjogc3RyaW5nID0gJ3YyJ1xuICApIHtcbiAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgIGlmIChwYWdlKSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdwYWdlJywgcGFnZSk7XG4gICAgfVxuXG4gICAgaWYgKGxpbWl0KSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdsaW1pdCcsIGxpbWl0KTtcbiAgICB9XG5cbiAgICBjb25zdCB1cmwgPSB0aGlzLmJ1aWxkTGlzdFVybCh2ZXJzaW9uKTtcblxuICAgIHRoaXMuaHR0cC5nZXQ8QXJyYXk8SW1hZ2VJbmZvPj4odXJsLCB7IHBhcmFtcyB9KS5zdWJzY3JpYmUoKGltZ0xpc3QpID0+IHtcbiAgICAgIGltZ0xpc3QuZm9yRWFjaCgoaW1nSW5mbykgPT4ge1xuICAgICAgICBpbWdJbmZvLnRodW1ibmFpbF91cmwgPSB0aGlzLmJ1aWxkSW1hZ2VVcmwoe1xuICAgICAgICAgIGlkOiBpbWdJbmZvLmlkLFxuICAgICAgICAgIHdpZHRoOiB0aHVtYm5haWxXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHRodW1ibmFpbEhlaWdodCxcbiAgICAgICAgICBtYXhXaWR0aDogaW1nSW5mby53aWR0aCxcbiAgICAgICAgICBtYXhIZWlnaHQ6IGltZ0luZm8uaGVpZ2h0LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmltYWdlTGlzdCQubmV4dChpbWdMaXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGJ1aWxkIHRoZSBHZXQgSW1hZ2UgdXJsXG4gIHByaXZhdGUgYnVpbGRJbWFnZVVybChpbWFnZTogUGFydGlhbDxJbWFnZVVybD4pOiBzdHJpbmcge1xuICAgIGxldCB1cmxSb3V0ZXM6IEFycmF5PHN0cmluZz4gPSBbdGhpcy5lbnYuaW1hZ2VTZXJ2aWNlVXJsXTtcblxuICAgIC8vIGRlZmluZSBpZiB0aGUgaW1hZ2UgaXMgc3BlY2lmaWVkXG4gICAgaWYgKGltYWdlLmlkKSB7XG4gICAgICB1cmxSb3V0ZXMucHVzaCgnaWQnLCBpbWFnZS5pZCk7XG4gICAgfVxuICAgIC8vIGVsc2UsIGRlZmluZSBpZiB0aGUgdXJsIGlzIHVzaW5nIGEgcmFuZG9tIHNlZWRcbiAgICBlbHNlIGlmIChpbWFnZS5zZWVkKSB7XG4gICAgICB1cmxSb3V0ZXMucHVzaCgnc2VlZCcsIGltYWdlLnNlZWQpO1xuICAgIH1cblxuICAgIC8vIGRlZmluZSB0aGUgaW1hZ2Ugd2lkdGhcbiAgICBpZiAoaW1hZ2Uud2lkdGgpIHtcbiAgICAgIC8vIGVuc3VyZSBtYXggZGltZW5zaW9ucyBub3QgcmVhY2hlZFxuICAgICAgaWYgKGltYWdlLm1heFdpZHRoKSB7XG4gICAgICAgIGltYWdlLndpZHRoID0gdGhpcy5zZXRNYXhEaW1lbnNpb24oaW1hZ2Uud2lkdGgsIGltYWdlLm1heFdpZHRoKTtcbiAgICAgIH1cblxuICAgICAgdXJsUm91dGVzLnB1c2goaW1hZ2Uud2lkdGgudG9TdHJpbmcoKSk7XG5cbiAgICAgIC8vIGlmIG5vIGhlaWdodCBpcyBkZWZpbmVkLCB0aGUgaW1hZ2Ugd2lsbCBiZSBzcXVhcmVcbiAgICAgIGlmIChpbWFnZS5oZWlnaHQpIHtcbiAgICAgICAgLy8gZW5zdXJlIG1heCBkaW1lbnNpb25zIG5vdCByZWFjaGVkXG4gICAgICAgIGlmIChpbWFnZS5tYXhIZWlnaHQpIHtcbiAgICAgICAgICBpbWFnZS5oZWlnaHQgPSB0aGlzLnNldE1heERpbWVuc2lvbihpbWFnZS5oZWlnaHQsIGltYWdlLm1heEhlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cmxSb3V0ZXMucHVzaChpbWFnZS5oZWlnaHQudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gam9pbiB0aGUgdXJsIHJvdXRlcyB0b2dldGhlclxuICAgIGxldCBpbWFnZVVybDogc3RyaW5nID0gdXJsUm91dGVzLmpvaW4oJy8nKTtcblxuICAgIC8vIGFkZCB0aGUgaW1hZ2UgdHlwZSB0byB0aGUgZW5kIG9mIHRoZSB1cmwgKHdpdGhvdXQgYSAvKVxuICAgIC8vIG11c3Qgbm90IGJlIHNlYXJjaGluZyBmb3IgaW1hZ2UgaW5mb1xuICAgIGlmIChpbWFnZS50eXBlKSB7XG4gICAgICBpbWFnZVVybCA9IGltYWdlVXJsLmNvbmNhdChpbWFnZS50eXBlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW1hZ2VVcmw7XG4gICAgLy8gZW5jb2RlIHRoZSB1cmxcbiAgICAvLyByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGltYWdlVXJsKTtcbiAgfVxuXG4gIC8vIGJ1aWxkIHRoZSBHZXQgSW1hZ2UgcGFyYW1zXG4gIHByaXZhdGUgYnVpbGRJbWFnZVVybFBhcmFtcyhpbWFnZTogUGFydGlhbDxJbWFnZVVybD4pOiBIdHRwUGFyYW1zIHtcbiAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgIGlmIChpbWFnZS5ncmF5c2NhbGUpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ2dyYXlzY2FsZScsICcnKTtcbiAgICB9XG5cbiAgICAvLyBibHVyIGRlZmF1bHQgdmFsdWUgaXMgNVxuICAgIGlmIChpbWFnZS5ibHVyKSB7XG4gICAgICBjb25zdCBibHVyVmFsdWUgPSBpbWFnZS5ibHVyVmFsdWUgPz8gJyc7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdibHVyJywgYmx1clZhbHVlLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIC8vIGFkZCByYW5kb20gcXVlcnkgdG8gcHJldmVudCBjYWNoaW5nXG4gICAgaWYgKGltYWdlLnJhbmRvbSkge1xuICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgncmFuZG9tJywgaW1hZ2UucmFuZG9tKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLy8gYnVpbGQgdGhlIEdldCBJbWFnZSB1cmxcbiAgcHJpdmF0ZSBidWlsZEluZm9VcmwoaW1hZ2U6IFBhcnRpYWw8SW1hZ2VVcmw+KTogc3RyaW5nIHtcbiAgICBsZXQgdXJsUm91dGVzOiBBcnJheTxzdHJpbmc+ID0gW3RoaXMuZW52LmltYWdlU2VydmljZVVybF07XG5cbiAgICAvLyBkZWZpbmUgaWYgdGhlIGltYWdlIGlzIHNwZWNpZmllZFxuICAgIGlmIChpbWFnZS5pZCkge1xuICAgICAgdXJsUm91dGVzLnB1c2goJ2lkJywgaW1hZ2UuaWQpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGUgaW5mbyByb3V0ZVxuICAgIHVybFJvdXRlcy5wdXNoKCdpbmZvJyk7XG5cbiAgICAvLyBqb2luIHRoZSB1cmwgcm91dGVzIHRvZ2V0aGVyXG4gICAgbGV0IGltYWdlVXJsOiBzdHJpbmcgPSB1cmxSb3V0ZXMuam9pbignLycpO1xuXG4gICAgcmV0dXJuIGltYWdlVXJsO1xuICAgIC8vIGVuY29kZSB0aGUgdXJsXG4gICAgLy8gcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChpbWFnZVVybCk7XG4gIH1cblxuICAvLyBidWlsZCB0aGUgR2V0IExpc3QgdXJsXG4gIHByaXZhdGUgYnVpbGRMaXN0VXJsKHZlcnNpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHVybFJvdXRlczogQXJyYXk8c3RyaW5nPiA9IFt0aGlzLmVudi5pbWFnZVNlcnZpY2VVcmxdO1xuXG4gICAgdXJsUm91dGVzLnB1c2godmVyc2lvbik7XG4gICAgdXJsUm91dGVzLnB1c2goJ2xpc3QnKTtcblxuICAgIC8vIGpvaW4gdGhlIHVybCByb3V0ZXMgdG9nZXRoZXJcbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB1cmxSb3V0ZXMuam9pbignLycpO1xuXG4gICAgcmV0dXJuIHVybDtcbiAgICAvLyBlbmNvZGUgdGhlIHVybFxuICAgIC8vIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgfVxuXG4gIC8vIG1ha2Ugc3VyZSB0aGUgaW1hZ2UgZGltZW5zaW9uIGlzIG5vdCBsYXJnZXIgdGhhbiB0aGUgbWF4IGRpbWVuc2lvblxuICAvLyBtYWtlIHN1cmUgdGhlIGRpbWVuc2lvbiBpcyBub3QgYSBuZWdhdGl2ZSB2YWx1ZVxuICBwcml2YXRlIHNldE1heERpbWVuc2lvbihkaW1lbnNpb246IG51bWJlciwgbWF4RGltZW5zaW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmFicyhkaW1lbnNpb24pIDw9IE1hdGguYWJzKG1heERpbWVuc2lvbilcbiAgICAgID8gTWF0aC5hYnMoZGltZW5zaW9uKVxuICAgICAgOiBNYXRoLmFicyhtYXhEaW1lbnNpb24pO1xuICB9XG59XG4iXX0=