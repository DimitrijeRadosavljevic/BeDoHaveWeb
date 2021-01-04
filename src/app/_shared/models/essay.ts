import {User} from './user';
import {Theme} from './theme';

export class Essay {
  id: string;
  title: string;
  content: string;
  date: Date;

  user: User;
  theme: Theme;

  likersCount: number;
  likedByUser: boolean;
}
