import { Injectable } from '@angular/core';

@Injectable()
export class ImagePreloadService {
  images = [];
  constructor() { }

  preload(imgUrl: string) {
    const image = new Image();
    image.src = imgUrl;
    this.images.push(image);
  }
}
