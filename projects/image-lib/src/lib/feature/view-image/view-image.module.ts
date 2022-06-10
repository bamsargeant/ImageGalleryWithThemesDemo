import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewImageComponent } from './view-image.component';
import { RouterModule } from '@angular/router';
import { CardModule } from '../../ui/card/card.module';

@NgModule({
  declarations: [ViewImageComponent],
  imports: [CommonModule, CardModule, RouterModule],
  exports: [ViewImageComponent],
})
export class ViewImageModule {}
