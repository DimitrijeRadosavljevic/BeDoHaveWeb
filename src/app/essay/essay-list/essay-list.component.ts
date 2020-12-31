import {Component, OnInit} from '@angular/core';
import {Essay} from '../../_shared/models/essay';
import {PaginatePipeArgs} from 'ngx-pagination/dist/paginate.pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {EssayService} from '../essay.service';

@Component({
  selector: 'app-essay-list',
  templateUrl: './essay-list.component.html',
  styleUrls: ['./essay-list.component.scss']
})
export class EssayListComponent implements OnInit {
  public essays: Essay[];
  private themeId: string;

  public paginator: any;
  public paginationConfig: PaginatePipeArgs = {
    id: 'essays',
    itemsPerPage: 10,
    currentPage: 1
  };
  public loading: number = 0;

  constructor(private essayService: EssayService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      this.themeId = params.get('themeId');
      this.initializeComponent();
    });
  }

  private initializeComponent(): void {
    this.fetchEssays();
  }

  private fetchEssays(): void {
    this.loading++;
    this.essayService.getEssays(this.themeId, this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage).subscribe(
      result => {
        // this.paginator = result.data;
        this.paginationConfig.totalItems = result.data.total;
        this.essays = result.data.essays as Essay[];
      },
      error => {
        this.router.navigate(['/error']);
      },
      () => this.loading--
    );
  }

  public onPageChange($event: number): void {
    this.paginationConfig.currentPage = $event;
    this.fetchEssays();
  }
}
