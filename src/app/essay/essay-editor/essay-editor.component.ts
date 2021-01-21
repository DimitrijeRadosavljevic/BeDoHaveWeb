import { ThemeEditorComponent } from './../../theme/theme-editor/theme-editor.component';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EssayService} from '../essay.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Essay} from '../../_shared/models/essay';
import {ThemeService} from '../../theme/theme.service';
import { Theme } from 'src/app/_shared/models/theme';

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
  public themeForUpdate: Theme;

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
        this.fetchThemeForUpdate();
        this.buildForm();
      }
    });
  }

  private buildForm(essay?: Essay): void {
    this.form = this.formBuilder.group({
      id: [essay ? essay.id : null],
      title: [essay ? essay.title : null, Validators.required],
      content: [essay ? essay.content : null, Validators.required],
      date: [essay ? essay.date : new Date().getDate(), Validators.required]
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
            this.updateTheme();
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
        this.essay = result.data as Essay;
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

  public fetchThemeForUpdate() {
    this.themeService.getThemeSpecific(this.themeId).subscribe(
      response => {
        this.themeForUpdate = response.data;
      },
      error => {
        console.log("Theme for update is not feched");
      }
    )
  }

  public updateTheme() {
    this.themeService.patchTheme(this.themeForUpdate.id, this.getDate(this.themeForUpdate.reminder)).subscribe(
      response => {
        //Some handle
      },
      error => {
        console.log(error);
      }
    )
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

  public getDate(reminder: string): string {
    console.log(reminder);
    let date = new Date();
    switch(reminder) {
      case 'daily':
        date.setDate(date.getDate() + 1)
        break;
      case 'weekly':
        date.setDate(date.getDate() + 7)
        break;
      case 'every-month':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'every-third-month':
        date.setMonth(date.getMonth() + 3)
        break;
      case 'every-six-months':
        date.setMonth(date.getMonth() + 6)                           
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1)                           
        break;
      default:
       date = new Date();
    }
    let month = date.getMonth();
    let finalMonth = month + 1;
    let createdDate = date.getFullYear() + "-" + finalMonth + "-" + date.getDate()
    console.log(createdDate);
    return createdDate
  }
}
