import { subscribeOn, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/_shared/models/theme';
import { ThemeService } from '../theme.service';
import {PaginatePipeArgs} from 'ngx-pagination/dist/paginate.pipe';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private themeService: ThemeService, private router: Router, private toastrService: ToastrService) { }
  //[ngClass]="{'mt-5': i>2}"
  ngOnInit(): void {
    this.initializeComponent();
  }

  initializeComponent() {
      this.fetchThemesPaginate();
  }

  fetchThemes() {
    this.themeService.getThemes().subscribe({
      next: response => {
        this.themes = response.data;
        console.log(this.themes)
      }
    })
  }

  public onPageChange($event: number): void {
    this.paginationConfig.currentPage = $event;
    this.fetchThemesPaginate();
  }

  fetchThemesPaginate() {
    this.loading++;
    this.themeService.getThemesPaginate( this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage).subscribe(
      result => {
        this.paginationConfig.totalItems = result.data.total;
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

  onDeleteTheme(theme: Theme) {
        this.loading++;
        this.themeService.deleteTheme(theme.id).subscribe(
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
}
