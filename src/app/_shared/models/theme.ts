import { Tag } from './tag';
import {User} from './user';

export class Theme {
    id: string;
    title: string;
    description: string;
    date: Date;
    reminder: string;
    tags: Tag[] = [];
    scheduleAnswer: any;
    user: User;
    public: boolean;

    likedByUser: boolean;
    likersCount: number;
}
