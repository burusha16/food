import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ContentPreloadService {
  images = [];
  constructor() {}

  preload(imgUrl: string) {
    const image = new Image();
    image.src = imgUrl;
    this.images.push(image);
  }
}
