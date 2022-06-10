import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { ToggleSwitchModule } from '../toggle-switch/toggle-switch.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    ToggleSwitchModule,
    RouterModule
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
