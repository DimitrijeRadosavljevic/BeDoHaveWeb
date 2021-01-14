import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EssayService} from '../essay.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Essay} from '../../_shared/models/essay';
import {ThemeService} from '../../theme/theme.service';

@Component({
  selector: 'app-essay-editor',
  templateUrl: './essay-editor.component.html',
  styleUrls: ['./essay-editor.component.scss']
})
export class EssayEditorComponent implements OnInit {
  public essayId: string | null;
  private themeId: string;
  private essay: Essay;
  public form: FormGroup;
  public formActive: boolean = false;
  public publicEssay: boolean;

  public loading: number = 0;


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private essayService: EssayService,
              private themeService: ThemeService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.publicEssay = this.route.toString().includes('public');
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      this.themeId = params.get('themeId');
      if (params.has('essayId')) {
        this.essayId = params.get('essayId');
        this.fetchEssay();
      }
      else {
        this.buildForm();
      }
    });
  }

  private buildForm(essay?: Essay): void {
    this.form = this.formBuilder.group({
      id: [essay ? essay.id : null],
      title: [essay ? essay.title : null, Validators.required],
      content: [essay ? essay.content : null, Validators.required],
      date: [essay ? new Date(essay.date).getDate() : new Date().getDate(), Validators.required]
    });

    this.formActive = true;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.essayId) {
      this.loading++;
      this.essayService.putEssay(this.form.value as Essay).subscribe(
        result => {
          this.toastrService.success('Essay successfully updated!');
        },
        error => {
          this.toastrService.error('Error has occurred, try again later');
        },
        () => this.loading--
      );
    }
    else {
      this.loading++;
      this.essayService.postEssay(this.themeId, this.form.value as Essay).subscribe(
        result => {
          this.toastrService.success('Essay successfully written!');
          if(this.publicEssay) {
            this.router.navigate([`/themes/${this.themeId}/essays/${result.data.id}/edit/public`]);
          } else {
            this.router.navigate([`/themes/${this.themeId}/essays/${result.data.id}/edit`]);
          }
        },
        error => {
          this.toastrService.error('Error has occurred, try again later');
        },
        () => this.loading--
      );
    }
  }

  private fetchEssay(): void {
    if (!this.essayId) { return; }

    this.loading++;
    this.essayService.getEssay(this.essayId).subscribe(
      result => {
        this.buildForm(result.data as Essay);
      },
      error => {
        console.log(error);
        // TODO handle error
        // this.router.navigateByUrl(['/error']);
      },
      () => this.loading--
    );
  }

  public deleteEssay(): void {
    if (!this.essayId) { return; }

    this.loading++;
    this.essayService.deleteEssay(this.essayId).subscribe(
      result => {
        this.toastrService.success('Essay successfully deleted!');
        if(this.publicEssay) {
          this.router.navigate([`/themes/${this.themeId}/public`]);
        } else {
          this.router.navigate([`/themes/${this.themeId}`])
        }
      },
      error => {
        this.toastrService.error('Essay could not be deleted. Try again latter.');
        console.log(error);
        // TODO handle error
        // this.router.navigateByUrl(['/error']);
      },
      () => this.loading--
    );
  }

  public goBack() {
    if(this.publicEssay) {
      if(this.essayId) {
        this.router.navigate([`themes/${this.themeId}/essays/${this.essayId}/public`]);
      } else {
        this.router.navigate([`themes/${this.themeId}/public`]);
      }
    } else {
      if(this.essayId){
        this.router.navigate([`themes/${this.themeId}/essays/${this.essayId}`]);
      } else {
        this.router.navigate([`themes/${this.themeId}`]);
      }
    }
  }
}
