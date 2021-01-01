import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';

import { ThemeService } from '../theme.service';
import { TagService } from '../../_shared/services/tag.service';
import { Theme } from '../../_shared/models/theme';
import { Tag } from '../../_shared/models/tag';
import {ListItem} from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {
  public form: FormGroup;
  public formActive: boolean = false;
  public tagNameFilter: FormControl;
  public tags: Tag[];
  public selectedTags: Tag[] = new Array();

  public loading: number = 0;

  public tagDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    limitSelection: 5
  };

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private themeService: ThemeService,
              private tagService: TagService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.buildFilter();
    this.fetchTags();
    this.buildForm();
  }

  private buildForm(theme?: Theme): void {
    this.form = this.formBuilder.group({
      id: [theme ? theme.id : null],
      title: [theme ? theme.title : null, Validators.required],
      description: [theme ? theme.description : null, Validators.required],
      date: [theme ? new Date(theme.date).getDate() : new Date().getDate(), Validators.required]
    });
    this.formActive = true;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const theme: Theme = this.form.value as Theme;
    theme.tags = this.selectedTags;

    this.loading++;
    this.themeService.postTheme(this.form.value as Theme).subscribe(
      result => {
        this.toastrService.success('Theme successfully created!');
        this.router.navigate([`/themes/${result.data.id}`]);
      },
      error => {
        this.toastrService.error('Error has occurred, try again later');
      },
      () => this.loading--
    );
  }

  private fetchTags(): void {
    this.tagService.getTags(this.tagNameFilter.value).subscribe(
      result => {
        this.tags = result.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  private buildFilter(): void {
    this.tagNameFilter = new FormControl('');
    this.tagNameFilter.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged())
      .subscribe(value => {
          this.fetchTags();
      });
  }

  public tagSelected($event: Tag): void {
    this.selectedTags.push($event);
  }

  public tagDeSelected($event: Tag): void {
    this.selectedTags = this.selectedTags.filter(tag => tag.id !== $event.id);
  }
}
