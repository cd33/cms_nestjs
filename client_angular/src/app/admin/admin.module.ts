import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { ArticleNewComponent } from './article-new/article-new.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';

@NgModule({
  declarations: [ArticleNewComponent, ArticleEditComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [ArticleEditComponent],
})
export class AdminModule {}
