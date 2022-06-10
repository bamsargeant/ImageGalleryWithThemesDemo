import { Component, ElementRef } from '@angular/core';
import { ThemeService } from 'ImageLib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ImageGalleryApp';

  constructor(
    private elementRef: ElementRef,
    private themeService: ThemeService
  ) {
    this.themeService.loadElementRef(this.elementRef);
    this.themeService.loadTheme('light');
  }
}
