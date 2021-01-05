import { Component, OnInit } from '@angular/core';
import {Essay} from '../../_shared/models/essay';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EssayService} from '../../essay/essay.service';
import {ThemeService} from '../../theme/theme.service';
import {ToastrService} from 'ngx-toastr';
import {HabitService} from '../habit.service';
import {Habit} from '../../_shared/models/habit';

@Component({
  selector: 'app-habit-editor',
  templateUrl: './habit-editor.component.html',
  styleUrls: ['./habit-editor.component.scss']
})
export class HabitEditorComponent implements OnInit {
  public habitId: string | null;
  public form: FormGroup;
  public formActive: boolean = false;

  public loading: number = 0;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private habitService: HabitService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('habitId')) {
        this.habitId = params.get('habitId');
        this.fetchHabit();
      }
      else {
        this.buildForm();
      }
    });
  }

  private buildForm(habit?: Habit): void {
    this.form = this.formBuilder.group({
      id: [habit ? habit.id : null],
      name: [habit ? habit.name : null, Validators.required],
    });

    this.formActive = true;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.habitId) {
      this.loading++;
      this.habitService.putHabit(this.form.value as Habit).subscribe(
        result => {
          this.toastrService.success('Habit successfully updated!');
          this.router.navigate([`/habits/${result.data.id}`]);
        },
        error => {
          this.toastrService.error('Error has occurred, try again later');
        },
        () => this.loading--
      );
    }
    else {
      this.loading++;
      this.habitService.postHabit(this.form.value as Habit).subscribe(
        result => {
          this.toastrService.success('Habit successfully written!');
          this.router.navigate([`/habits/${result.data.id}`]);
        },
        error => {
          this.toastrService.error('Error has occurred, try again later');
        },
        () => this.loading--
      );
    }
  }

  private fetchHabit(): void {
    if (!this.habitId) { return; }

    this.loading++;
    this.habitService.getHabit(this.habitId).subscribe(
      result => {
        this.buildForm(result.data as Habit);
      },
      error => {
        console.log(error);
        // TODO handle error
        // this.router.navigateByUrl(['/error']);
      },
      () => this.loading--
    );
  }

  public deleteHabit(): void {
    if (!this.habitId) { return; }

    this.loading++;
    this.habitService.deleteHabit(this.habitId).subscribe(
      result => {
        this.toastrService.success('Habit successfully deleted!');
        this.router.navigate([`/habits`]);
      },
      error => {
        this.toastrService.error('Habit could not be deleted. Try again latter.');
        console.log(error);
        // TODO handle error
        // this.router.navigateByUrl(['/error']);
      },
      () => this.loading--
    );

  }
}
