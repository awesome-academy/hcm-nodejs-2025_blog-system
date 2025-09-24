import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersController } from './follower.controller';
import { FollowersService } from './follower.service';
import { Follower } from './entities/follower.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Author } from '@/modules/authors/entities/author.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Follower, User, Author]), SharedModule],
  providers: [FollowersService],
  controllers: [FollowersController],
  exports: [FollowersService],
})
export class FollowersModule {}
