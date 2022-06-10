import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageGalleryComponent, ViewImageComponent } from 'ImageLib';

const routes: Routes = [
  {
    path: '',
    component: ImageGalleryComponent,
  },
  {
    path: ':id',
    component: ViewImageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
