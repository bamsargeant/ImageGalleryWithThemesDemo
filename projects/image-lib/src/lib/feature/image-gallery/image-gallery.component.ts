import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ImageService } from '../../data-access/image-service.service';
import { ImageInfo } from '../../models/image-info.model';

@Component({
  selector: 'img-lib-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  public imageList: Array<ImageInfo> = [];

  public imageListSubscription$!: Subscription;

  private loadMoreCounter: number = 0;
  public page: number = 1;
  public limit: number = 5;
  public thumbnailWidth: number = 419;
  public thumbnailHeight: number = 280;
  public appendImages: boolean = false;

  constructor(
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.imageListSubscription$ = this.imageService.imageList$.subscribe(
      (e) => {
        // continuously add to the list
        if (this.appendImages) {
          this.imageList.push(...e);
        } else {
          this.imageList = e;
          this.appendImages = true;
        }

        this.imageList = this.imageList.sort((a, b) =>
          a.id.localeCompare(b.id)
        );
      }
    );
  }

  ngOnInit(): void {
    const pageParam = Number(this.route.snapshot.queryParamMap.get('page'));
    if (pageParam) this.page = pageParam;

    const limitParam = Number(this.route.snapshot.queryParamMap.get('limit'));
    if (limitParam) this.limit = limitParam;

    const loadMoreCounterParam = Number(
      this.route.snapshot.queryParamMap.get('load')
    );
    if (loadMoreCounterParam) this.loadMoreCounter = loadMoreCounterParam;

    this.loadImages(false, 0);
  }

  ngOnDestroy(): void {
    if (this.imageListSubscription$) {
      this.imageListSubscription$.unsubscribe();
    }
  }

  public viewImage(imageInfo: any) {
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

  public loadImages(
    appendImages: boolean = false,
    loadCount: number = this.loadMoreCounter
  ) {
    this.appendImages = appendImages;

    for (let index = loadCount; index <= this.loadMoreCounter; index++) {
      this.imageService.retrieveList(
        this.thumbnailWidth,
        this.thumbnailHeight,
        this.page + index,
        this.limit
      );
    }
  }

  public loadMore() {
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

  public next() {
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

  public previous() {
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
