import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private repo: Repository<Article>,
  ) {}

  /** 获取所有文章，按创建时间倒序 */
  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  /** 获取单篇文章 */
  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  /** 创建文章 */
  create(title: string, content: string) {
    const newArticle = this.repo.create({ title, content });
    return this.repo.save(newArticle);
  }

  /** 更新文章 */
  async update(id: number, dto: { title?: string; content?: string }) {
    const article = await this.repo.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException('文章不存在');
    }
    // 只更新传入的字段
    if (dto.title !== undefined) article.title = dto.title;
    if (dto.content !== undefined) article.content = dto.content;
    return this.repo.save(article);
  }

  /** 删除文章 */
  async remove(id: number) {
    const article = await this.repo.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException('文章不存在');
    }
    return this.repo.delete(id);
  }
}
