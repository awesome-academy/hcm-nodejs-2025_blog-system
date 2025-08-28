import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '@/modules/users/entities/user.entity';
import { Author } from '../authors/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Author])],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
