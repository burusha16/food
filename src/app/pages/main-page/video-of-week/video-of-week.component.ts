import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-video-of-week',
  templateUrl: './video-of-week.component.html',
  styleUrls: ['./video-of-week.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoOfWeekComponent {
  isVideoVisible: boolean;
  videoHash = 'CF38tgE6udg';
  previewUrlWebp = `https://i.ytimg.com/vi_webp/${this.videoHash}/maxresdefault.webp`;
  previewUrl = `https://i.ytimg.com/vi/${this.videoHash}/maxresdefault.jpg`;

  showVideo() {
    this.isVideoVisible = true;
  }
}
