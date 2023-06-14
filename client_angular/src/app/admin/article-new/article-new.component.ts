import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { EMPTY, Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
})
export class ArticleNewComponent {
  response$: any = null;
  error = null;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
  ) {}

  articleForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', [Validators.required, Validators.minLength(5)]],
    creationDate: new Date().toISOString(),
  });

  async submit() {
    this.response$ = this.articleService
      .createArticle(this.articleForm.value)
      .pipe(
        catchError((err) => {
          this.error = err;
          return EMPTY;
        }),
      );
  }

  get title() {
    return this.articleForm.get('title');
  }

  get content() {
    return this.articleForm.get('content');
  }
}
