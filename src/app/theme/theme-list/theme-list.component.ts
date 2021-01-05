import { debounceTime, distinctUntilChanged, subscribeOn, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/_shared/models/theme';
import { ThemeService } from '../theme.service';
import {PaginatePipeArgs} from 'ngx-pagination/dist/paginate.pipe';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Tag } from 'src/app/_shared/models/tag';
import { TagService } from 'src/app/_shared/services/tag.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public paginator: any;
  public paginationConfig: PaginatePipeArgs = {
    id: 'essays',
    itemsPerPage: 6,
    currentPage: 1
  };
  public loading: number = 0;
  public themes: Theme[];
  public tagDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    limitSelection: 5
  };
  public selectedTags: Tag[] = new Array();
  public tags: Tag[];
  public tagNameFilter: FormControl;
  public filterTags: string | undefined;
  public themeForDelete: Theme;
  public titleFilter: string | undefined;
  public passiveThemes: boolean = true;

  constructor(private themeService: ThemeService,
              private router: Router,
              private toastrService: ToastrService,
              private tagService: TagService) { }
  ngOnInit(): void {
    this.initializeComponent();

  }

  initializeComponent() {
      this.fetchThemesPaginate();
      this.buildFilter();
      this.fetchTags();
  }

  fetchThemes() {
    this.themeService.getThemes().subscribe({
      next: response => {
        this.themes = response.data;
        console.log(this.themes)
      }
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

  public onPageChange($event: number): void {
    this.paginationConfig.currentPage = $event;
    this.fetchThemesPaginate();
  }

  fetchThemesPaginate() {
    this.loading++;
    this.themeService.getThemesPaginate( this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage, this.titleFilter, this.filterTags).subscribe(
      result => {
        this.paginationConfig.totalItems = result.data.total;
        this.themes = [];
        this.themes = result.data.themes as Theme[];
      },
      error => {
        this.router.navigate(['/error']);
      },
      () => this.loading--
    );
  }

  goToEditTheme(theme: Theme) {
    this.router.navigate([`./themes/${theme.id}/edit`]);
  }

  goToDetails(theme: Theme) {
    this.router.navigate([`./themes/${theme.id}`])
  }

  setThemeForDelete(theme:Theme) {
    this.themeForDelete = theme;
  }
  onDeleteTheme() {
    if(!this.themeForDelete)
      return;
    console.log(this.themeForDelete);
        this.loading++;
        this.themeService.deleteTheme(this.themeForDelete.id).subscribe(
          response => {
            this.toastrService.success('Theme successfully deleted!');
            this.fetchThemesPaginate();
            this.router.navigate(['/themes']);
          },
          error => {
            this.toastrService.error('Theme could not be deleted. Try again latter.');
            console.log(error);
            // TODO handle error
            // this.router.navigateByUrl(['/error']);
          },
          () => this.loading--
        );
      }

      public tagSelected($event: Tag): void {
        this.selectedTags.push($event);
        this.filterThemes();
      }
    
      public tagDeSelected($event: Tag): void {
        this.selectedTags = this.selectedTags.filter(tag => tag.id !== $event.id);
        this.filterThemes();
      }

      public setTitleFilter(titleFilterValue: string) {
        this.titleFilter = titleFilterValue;
        this.filterThemes();
      }
      
      filterThemes() {
        if(this.selectedTags.length == 0 && this.titleFilter == ""){
          this.filterTags = undefined;
          this.titleFilter = undefined;
          this.fetchThemesPaginate();
        } else {
          let tags:string = "";
          this.selectedTags.forEach(tag => {
            tags += tag.name;
          });
          this.filterTags = tags;
          this.fetchThemesPaginate();
        }
      }
}
