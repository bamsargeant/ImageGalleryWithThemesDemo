import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { ENVIRONMENT, Environment } from 'UtilsLib';
import { ImageInfo } from '../models/image-info.model';
import { ImageUrl } from '../models/image-url.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public imageList$: BehaviorSubject<Array<ImageInfo>> = new BehaviorSubject<
    Array<ImageInfo>
  >([]);

  public imageInfo$: BehaviorSubject<ImageInfo | undefined> =
    new BehaviorSubject<ImageInfo | undefined>(undefined);

  public image$: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);

  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private env: Environment
  ) {}

  public retrieveImage(image: Partial<ImageUrl>) {
    const url = this.buildImageUrl(image);
    const params = this.buildImageUrlParams(image);

    return this.http.get<string>(url, { params }).subscribe((imgUrl) => {
      this.image$.next(imgUrl);
    });
  }

  public inspectImage(image: ImageInfo) {
    this.imageInfo$.next(image);
  }

  public retrieveImageInfo(image: Partial<ImageUrl>) {
    const url = this.buildInfoUrl(image);

    return this.http.get<ImageInfo>(url).subscribe((imgInfo) => {
      this.imageInfo$.next(imgInfo);
    });
  }

  public retrieveList(
    thumbnailWidth: number = 420,
    thumbnailHeight: number = 280,
    page: number | undefined = undefined,
    limit: number | undefined = undefined,
    version: string = 'v2'
  ) {
    let params = new HttpParams();

    if (page) {
      params = params.append('page', page);
    }

    if (limit) {
      params = params.append('limit', limit);
    }

    const url = this.buildListUrl(version);

    this.http.get<Array<ImageInfo>>(url, { params }).subscribe((imgList) => {
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
  private buildImageUrl(image: Partial<ImageUrl>): string {
    let urlRoutes: Array<string> = [this.env.imageServiceUrl];

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
    let imageUrl: string = urlRoutes.join('/');

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
  private buildImageUrlParams(image: Partial<ImageUrl>): HttpParams {
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
  private buildInfoUrl(image: Partial<ImageUrl>): string {
    let urlRoutes: Array<string> = [this.env.imageServiceUrl];

    // define if the image is specified
    if (image.id) {
      urlRoutes.push('id', image.id);
    }

    // add the info route
    urlRoutes.push('info');

    // join the url routes together
    let imageUrl: string = urlRoutes.join('/');

    return imageUrl;
    // encode the url
    // return encodeURIComponent(imageUrl);
  }

  // build the Get List url
  private buildListUrl(version: string): string {
    let urlRoutes: Array<string> = [this.env.imageServiceUrl];

    urlRoutes.push(version);
    urlRoutes.push('list');

    // join the url routes together
    let url: string = urlRoutes.join('/');

    return url;
    // encode the url
    // return encodeURIComponent(url);
  }

  // make sure the image dimension is not larger than the max dimension
  // make sure the dimension is not a negative value
  private setMaxDimension(dimension: number, maxDimension: number): number {
    return Math.abs(dimension) <= Math.abs(maxDimension)
      ? Math.abs(dimension)
      : Math.abs(maxDimension);
  }
}
