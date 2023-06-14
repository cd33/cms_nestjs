import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create_article.dto';
import { Article } from './interfaces/article.interface';
import { UpdateArticleDto } from './dto/update_article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().sort({ creationDate: -1 }).exec();
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createArticle = new this.articleModel(createArticleDto);
    return await createArticle.save();
  }

  async delete(id: string): Promise<Article> {
    return await this.articleModel.findByIdAndRemove(id);
  }

  async update(id: string, article: UpdateArticleDto): Promise<Article> {
    const updatedArticle = await this.articleModel.findByIdAndUpdate(
      id,
      article,
      { new: true },
    );
    return updatedArticle;
  }
}
