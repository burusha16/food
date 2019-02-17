import { Injectable } from '@angular/core';

export type PreloadableContentTypes = 'image' | 'video' | 'audio';

export interface IWaitingForLoadingItem {
  type: PreloadableContentTypes;
  src: string;
}

@Injectable({providedIn: 'root'})
export class ContentPreloadService {
  loadedItems: HTMLElement[] = [];
  waitingForLoading: IWaitingForLoadingItem[] = [];
  contentLoaded: boolean;

  constructor() {
    const loadEventHandler = () => {
      this.contentLoaded = true;
      this.waitingForLoading.forEach(
        (item: IWaitingForLoadingItem) => this.preload(item.type, item.src)
      );
      window.removeEventListener('load', loadEventHandler);
    };
    window.addEventListener('load', loadEventHandler);
  }

  preload(type: PreloadableContentTypes, imgUrl: string) {
    if (this.contentLoaded) {
      let item: HTMLImageElement | HTMLAudioElement;
      switch (type) {
        case 'image':
          item = new Image();
          break;
        case 'audio' || 'video':
          item = new Audio();
      }
      item.src = imgUrl;
      this.loadedItems.push(item);
    } else {
      this.waitingForLoading.push({type: type, src: imgUrl});
    }
  }
}
