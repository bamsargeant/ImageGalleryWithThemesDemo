import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { ENVIRONMENT } from 'UtilsLib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageLibModule } from 'ImageLib';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ImageLibModule, HttpClientModule],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
