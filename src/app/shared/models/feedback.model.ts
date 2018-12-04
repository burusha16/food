import {IFeedback} from '../interfaces/feedback.interface';

export class Feedback implements IFeedback {
  authorAvatarUrl: string;
  authorName: string;
  message: string;
  photoUrl: string;

  constructor(data: IFeedback) {
    this.authorAvatarUrl = data.authorAvatarUrl;
    this.authorName = data.authorName;
    this.message = data.message;
    this.photoUrl = data.photoUrl;
  }
}

