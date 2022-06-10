import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../data-access/theme.service';
// import { ThemeService } from 'ImageLib';

@Component({
  selector: 'img-lib-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  public get themeName(): string | undefined {
    return this.themeService.activeThemeName;
  }

  public changeTheme(lightMode: boolean) {
    this.themeService.loadTheme(lightMode ? 'light' : 'dark');
    console.log(this.themeService.activeThemeName)
  }
}
