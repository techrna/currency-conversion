import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.dev.env',
  }),
  MongooseModule.forRoot(process.env.MONGO_URL+process.env.DB_NAME)
],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
