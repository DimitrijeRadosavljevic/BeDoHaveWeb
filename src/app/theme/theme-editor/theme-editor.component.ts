import { authError } from './../../store/auth/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { NgModel } from '@angular/forms'

import { ThemeService } from '../theme.service';
import { TagService } from '../../_shared/services/tag.service';
import { Theme } from '../../_shared/models/theme';
import { Tag } from '../../_shared/models/tag';

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
  public themeForUpdate: Theme = new Theme();
  public selectedItems: Tag[] = [];
  public themeId: string | null;

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
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      if (params.has('themeId')) {
        this.themeId = params.get('themeId');
        this.fetchTheme(this.themeId, true);
      }
      else {
        this.buildForm();
      }
    });
  }

  private buildForm(theme?: Theme): void {
    this.form = this.formBuilder.group({
      id: [theme ? theme.id : null],
      title: [theme ? theme.title : null, Validators.required],
      description: [theme ? theme.description : null, Validators.required],
      //date: [theme ? new Date(theme.date).getDate() : new Date().getDate(), Validators.required],
      date: [theme ? theme.date : new Date().getDate(), Validators.required],
      reminder: [theme ? theme.reminder : 'never', Validators.required],
      selectTags: [theme ? theme.tags : null ]
    });
    this.formActive = true;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log("invalid")
      return;
    }

    if(!this.themeId) {

      const theme: Theme = this.form.value as Theme;
      theme.tags = this.selectedTags;
      theme.scheduleAnswer = new Date();

      this.loading++;
      this.themeService.postTheme(theme).subscribe(
        result => {
          this.toastrService.success('Theme successfully created!');
          this.router.navigate([`/themes/${result.data.id}`]);
        },
        error => {
          this.toastrService.error('Error has occurred, try again later');
        },
        () => this.loading--
      );
    } else {
      const theme: Theme = this.form.value as Theme;
      theme.tags = this.selectedTags;

      this.loading++;
      this.themeService.putTheme(theme).subscribe(
        response => {
          this.toastrService.success('Theme successfully updated!');
          this.router.navigate([`/themes/${response.data.id}`]);
        },
        error => {
          this.toastrService.error('Error has occured, try again later');
        },
        () => this.loading --
      )
    }
  }

  fetchTheme(themeId:string | null, tags: boolean) {

    this.themeService.getTheme(themeId, tags).subscribe({
      next: result => {
        this.themeForUpdate = result.data as Theme;
        this.fetchTags();
        this.buildForm(result.data as Theme);
        this.selectedTags = this.themeForUpdate.tags;
      },
      error: error => { console.log(error) }
    })
  }

  getMultiselectDropdown() {
    let multiselectDropdown = document.getElementById('multiselectDropdown');
    multiselectDropdown?.dataset
  }

  fetchThemeTags(themeId:string | null) {

    this.tagService.getTagsForTheme(themeId).subscribe({
      next: response => {
        this.themeForUpdate.tags = response.data as Tag[]

        console.log(this.themeForUpdate);
      },
      error: error => console.log(error)
    })
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
    console.log("Deselected");
    this.selectedTags = this.selectedTags.filter(tag => tag.id !== $event.id);
  }
}
