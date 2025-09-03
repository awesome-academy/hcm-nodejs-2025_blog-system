import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '@/modules/users/entities/user.entity';
import { Author } from '../authors/entities/author.entity';
import { SharedModule } from '../shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRATION } from '@/common/constants/jwt.constant';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION }, // access token hết hạn sau 15 phút
    }),
    TypeOrmModule.forFeature([User, Author]),
    SharedModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
