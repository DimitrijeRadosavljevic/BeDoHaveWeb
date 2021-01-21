import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';

import { Habit } from '../../_shared/models/habit';
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.scss']
})
export class HabitListComponent implements OnInit {
  public habits: Habit[];

  public paginator: any;
  public paginationConfig: PaginatePipeArgs = {
    id: 'habits',
    itemsPerPage: 10,
    currentPage: 1
  };
  public loading: number = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private habitService: HabitService) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.fetchHabits();
  }

  private fetchHabits(): void {
    this.loading++;
    this.habitService.getHabits(this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage).subscribe(
      result => {
        this.paginationConfig.totalItems = result.data.total;
        this.habits = result.data.habits as Habit[];
      },
      error => {
        // this.router.navigate(['/error']);
      },
      () => this.loading--
    );
  }

  public onPageChange($event: number): void {
    this.paginationConfig.currentPage = $event;
    this.fetchHabits();
  }
}
