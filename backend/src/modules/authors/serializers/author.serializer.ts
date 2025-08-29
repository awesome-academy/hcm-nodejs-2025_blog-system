import { UserSerializer } from '@/modules/users/serializers/user.serializer';
import { Expose, Type } from 'class-transformer';

export class AuthorSerializer {
  @Expose()
  id: number;

  @Expose()
  penName: string;

  @Expose()
  bio: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
