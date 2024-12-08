import helmet from 'helmet';
import * as BodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './AppModule';
import { CustomLogger } from './Helpers/Middlewares/CustomLogger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    app.useLogger(app.get(CustomLogger));
    app.use(helmet());

    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));
    app.setGlobalPrefix('api/v1/api-gateway');
    app.enableCors();

    // Swagger configuration
    const config = new DocumentBuilder().setTitle('User API').setDescription('API for managing users').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(configService.get<string>('PORT'));
}
bootstrap();
