import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { HabitService } from '../habit.service';
import { TagService } from '../../_shared/services/tag.service';

import { Habit } from '../../_shared/models/habit';
import { Tag } from '../../_shared/models/tag';
import {IDropdownSettings} from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-habit-editor',
  templateUrl: './habit-editor.component.html',
  styleUrls: ['./habit-editor.component.scss']
})
export class HabitEditorComponent implements OnInit {
  public habitId: string | null;
  public form: FormGroup;
  public formActive: boolean = false;
  public tags: Tag[];
  public selectedTags: Tag[] = new Array();
  public tagDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    limitSelection: 5
  };

  public loading: number = 0;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private habitService: HabitService,
              private tagService: TagService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.route.paramMap.subscribe(params => {
      this.fetchTags();
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
      description: [habit ? habit.description : null],
      date: [habit ? habit.date : null, Validators.required],
      frequency: [habit ? habit.frequency : 'daily'],
      frequencySpecific: [habit ? habit.frequencySpecific : null],
      selectedTags: [habit ? habit.tags : []]
    });

    this.subscribeToFrequencyChanges(this.form);

    this.formActive = true;
  }

  private subscribeToFrequencyChanges(form: FormGroup): void {
    form.controls.frequency.valueChanges.subscribe(value => {
      switch (value) {
        case 'daily':
          form.controls.frequencySpecific.setValue(null);
          break;
        case 'per-week':
          form.controls.frequencySpecific.setValue(1);
          break;
        case 'per-month':
          form.controls.frequencySpecific.setValue(1);
          break;
        case 'specific-days':
          form.controls.frequencySpecific.setValue([1, 1, 1, 1, 1, 1, 1]);
          break;
      }
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const habit: Habit = this.form.value as Habit;
    habit.tags = this.selectedTags;

    if (this.habitId) {
      this.loading++;
      this.habitService.putHabit(habit).subscribe(
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
        this.selectedTags = result.data.tags;
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

  private fetchTags(): void {
    this.tagService.getTags('').subscribe(
      result => {
        this.tags = result.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  public tagSelected($event: Tag): void {
    this.selectedTags.push($event);
  }

  public tagDeSelected($event: Tag): void {
    this.selectedTags = this.selectedTags.filter(tag => tag.id !== $event.id);
  }

  public setFrequencySpecific(value: Array<number>): void {
    const frequencySpecific = this.form.controls.frequencySpecific.value as [];
    const newValue = new Array<number>();
    let i = 0;
    for (i; i < 7; i++) {
      // tslint:disable-next-line:no-bitwise
      newValue.push(frequencySpecific[i] & value[i]);
    }

    this.form.controls.frequencySpecific.setValue(newValue);
  }
}
