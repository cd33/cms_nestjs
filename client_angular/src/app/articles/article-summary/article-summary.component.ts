import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../admin/article.service';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-article-summary',
  templateUrl: './article-summary.component.html',
})
export class ArticleSummaryComponent {
  isWaitingForServerResponse = false;
  error: Error | null = null;
  @Output() deleteSuccess = new EventEmitter<boolean>();
  @Input() article: Article = {
    _id: '',
    title: '',
    content: '',
  };
  isInEditMode = false;

  constructor(
    private readonly articleService: ArticleService,
    public readonly authService: AuthService,
  ) {}

  delete(article: Article) {
    this.isWaitingForServerResponse = true;
    this.articleService
      .deleteArticle(article)
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (data) => {
          this.isWaitingForServerResponse = false;
          this.handleSuccess(data);
        },
        error: (err) => {
          this.isWaitingForServerResponse = false;
          this.handleError(err);
        },
        // complete: () => {},
      });
  }

  handleError = (err: Error) => {
    this.error = err;
    return throwError(() => this.error);
  };

  handleSuccess(data: Article) {
    console.log('success :>> ', data);
    this.deleteSuccess.emit(true);
  }

  // handleEditMode() {
  //   this.isInEditMode = false;
  // }
  handleEditMode = (): void => {
    this.isInEditMode = false;
  };
}
