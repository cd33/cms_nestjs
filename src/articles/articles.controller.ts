import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create_article.dto';
import { CheckauthorInterceptor } from 'src/checkauthor/checkauthor.interceptor';
import { UpdateArticleDto } from './dto/update_article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll() {
    return this.articlesService.findAll();
  }

  @Post()
  @UseInterceptors(CheckauthorInterceptor)
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return this.articlesService.delete(id);
  }

  @Put(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body() article: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, article);
  }
}
