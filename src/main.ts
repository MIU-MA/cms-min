import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1. 配置 CORS 白名单
  app.enableCors({
    origin: [
      'https://api.jxufe-tech.top',
      'https://miuma-blog.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    credentials: true,
  });

  // 2. 开放静态资源目录 (存放图片和音乐)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 3. 生成 OpenAPI 文档对象
  const config = new DocumentBuilder()
    .setTitle('博客后台 API')
    .setDescription('文章、音乐、上传接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // 4. Scalar 美化文档页 (挂载到 /docs，避免拦截 /api 业务路由)
  app.use(
    '/docs',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'purple',
      metaData: {
        title: '博客后台 API',
        description: '文章、音乐、上传接口文档',
      },
    }),
  );

  await app.listen(3002);
  console.log('后端运行在: http://localhost:3002');
  console.log('API 文档:   http://localhost:3002/docs');
}
bootstrap();
