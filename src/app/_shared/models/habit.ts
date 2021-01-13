import {Tag} from './tag';

export class Habit {
  id: string;
  name: string;
  description: string;
  date: Date;
  frequency: string;
  frequencySpecific: number | string;
  statistics: number | null;

  tags: Tag[];
}
