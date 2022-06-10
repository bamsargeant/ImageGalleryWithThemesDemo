import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from './image-gallery.component';
import { CardModule } from '../../ui/card/card.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ImageGalleryComponent],
  imports: [CommonModule, CardModule, RouterModule],
  exports: [ImageGalleryComponent],
})
export class ImageGalleryModule {}
