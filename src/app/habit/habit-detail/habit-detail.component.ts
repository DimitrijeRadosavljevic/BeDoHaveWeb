import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Habit } from '../../_shared/models/habit';
import { HabitService } from '../habit.service';
import { FormBuilder } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.component.html',
  styleUrls: ['./habit-detail.component.scss']
})
export class HabitDetailComponent implements OnInit {
  private habitId: string;
  public habit: Habit;
  public loading: number = 0;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService,
              private habitService: HabitService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      this.habitId = params.get('habitId');
      this.fetchHabit();
    });
  }

  private fetchHabit(): void {
    this.loading++;
    this.habitService.getHabit(this.habitId).subscribe(
      result => {
        this.habit = result.data;
      },
      error => {
      },
      () => this.loading--
    );
  }

  public deleteHabit(): void {
    this.habitService.deleteHabit(this.habitId).subscribe(
      result => {
        this.toastrService.success('Habit successfully removed!');
        this.router.navigate(['/habits']);
      },
      error => {
        this.toastrService.error('Error occurred, try again later!');
      }
    )
  }
}
