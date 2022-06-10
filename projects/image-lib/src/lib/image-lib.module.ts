import { NgModule } from '@angular/core';
import { ImageGalleryModule } from './feature/image-gallery/image-gallery.module';
import { BannerModule } from './ui/banner/banner.module';
import { CardModule } from './ui/card/card.module';
import { FooterModule } from './ui/footer/footer.module';

@NgModule({
  declarations: [],
  imports: [BannerModule, ImageGalleryModule, FooterModule, CardModule],
  exports: [BannerModule, ImageGalleryModule, FooterModule, CardModule],
})
export class ImageLibModule {}
