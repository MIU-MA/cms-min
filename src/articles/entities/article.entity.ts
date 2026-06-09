import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('articles')
export class Article {
  @ApiProperty({ description: '文章ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '标题', example: '我的第一篇博客' })
  @Column()
  title: string;

  @ApiProperty({ description: '正文内容', example: '这是文章内容...' })
  @Column('text')
  content: string;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  createdAt: Date;
}
