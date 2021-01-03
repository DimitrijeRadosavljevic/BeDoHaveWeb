import { Tag } from './tag';

export class Theme {
    id: string;
    title: string;
    description: string;
    date: Date;
    reminder: string;
    tags: Tag[] = [];
}
