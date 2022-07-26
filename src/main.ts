import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { timeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //GLOBALS
  app.setGlobalPrefix('api/v2')
  app.useGlobalInterceptors(new timeOutInterceptor())
  app.useGlobalPipes( 
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
    })
   );

   //Swagger
   const options = new DocumentBuilder()
    .setTitle('Pokemon Api')
    .setDescription('Pokedex')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      filter: true
    }
  })

  await app.listen(process.env.PORT);
  console.log(`App running on port ${process.env.PORT}`);
  
}
bootstrap();
