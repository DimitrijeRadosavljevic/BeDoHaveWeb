import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginatePipeArgs} from 'ngx-pagination/dist/paginate.pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {HabitRecord} from '../../_shared/models/habit-record';
import {HabitRecordService} from '../habit-record.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-habit-record-list',
  templateUrl: './habit-record-list.component.html',
  styleUrls: ['./habit-record-list.component.scss']
})
export class HabitRecordListComponent implements OnInit {
  @Input() habitId: string;
  public habitsRecords: HabitRecord[] = [];

  @Output() onFetchStatistics: EventEmitter<null> = new EventEmitter<null>();

  public paginator: any;
  public paginationConfig: PaginatePipeArgs = {
    id: 'habits-records',
    itemsPerPage: 5,
    currentPage: 1
  };

  public form: FormGroup;
  public formActive: boolean = false;
  public loading: number = 0;

  private recordToBeDeleted: string | null = null;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private habitRecordService: HabitRecordService) {
  }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.fetchHabitRecords();
  }

  private fetchHabitRecords(): void {
    this.loading++;
    this.habitRecordService.getHabitRecords(this.habitId, this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage).subscribe(
      result => {
        this.paginationConfig.totalItems = result.data.total;
        this.habitsRecords = result.data.habitRecords as HabitRecord[];
      },
      error => {
        // this.router.navigate(['/error']);
      },
      () => this.loading--
    );
  }

  public onPageChange($event: number): void {
    this.paginationConfig.currentPage = $event;
    this.fetchHabitRecords();
  }


  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.controls.id.value) {
      this.habitRecordService.putHabitRecord(this.form.value as HabitRecord).subscribe(
        result => {
          this.toastrService.success('Record successfully updated!');
          this.habitsRecords = this.habitsRecords.map(record => {
            if (record.id === this.form.controls.id.value) {
              return result.data;
            }
            return record;
          });
        },
        error => {
          this.toastrService.error('Error has occurred, try again later');
        }
      );
    } else {
      this.habitRecordService.postHabitRecord(this.habitId, this.form.value as HabitRecord).subscribe(
        result => {
          this.toastrService.success('Record successfully added!');
          // @ts-ignore
          if (this.paginationConfig.itemsPerPage > this.habitsRecords.length) {
            this.habitsRecords.push(result.data);
          }
          // @ts-ignore
          this.paginationConfig.totalItems++;
        },
        error => {
          this.toastrService.error('Error has occurred, try again later');
        }
      );
    }

    this.onFetchStatistics.emit(null);
  }

  public buildForm(habitRecord?: HabitRecord): void {
    this.form = this.formBuilder.group({
      id: [habitRecord ? habitRecord.id : null],
      date: [habitRecord ? habitRecord.date : null, Validators.required],
      comment: [habitRecord ? habitRecord.comment : ''],
      status: [habitRecord ? habitRecord.status : true, Validators.required]
    });

    this.formActive = true;
  }

  public deleteRecord(): void {
    if (!this.recordToBeDeleted) {
      return;
    }

    this.habitRecordService.deleteHabitRecord(this.recordToBeDeleted).subscribe(
      result => {
        this.onFetchStatistics.emit(null);
        this.toastrService.success('Record successfully deleted!');
        this.habitsRecords = this.habitsRecords.filter(record => record.id !== this.recordToBeDeleted);
        this.recordToBeDeleted = null;
        // @ts-ignore
        this.paginationConfig.totalItems--;
        // @ts-ignore
        if (this.habitsRecords.length === 0 && this.paginationConfig.totalItems > 0) {
          this.paginationConfig.currentPage = 1;
          this.fetchHabitRecords();
        }
      },
      error => {
        this.toastrService.error('Error occurred, try again later!');
      }
    );
  }

  public markRecordToBeDeleted(recordId: string): void {
    this.recordToBeDeleted = recordId;
  }
}
