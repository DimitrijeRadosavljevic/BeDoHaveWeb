import { Tag } from './tag';
import {User} from './user';

export class Theme {
    id: string;
    title: string;
    description: string;
    date: Date;
    reminder: string;
    tags: Tag[] = [];
    scheduleAnswer: Date;
    user: User;

    likedByUser: boolean;
    likersCount: number;
}
