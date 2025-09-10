import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailJob } from './mail.job';
import { MailWorker } from './mail.worker';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
    providers: [MailJob, MailWorker],
  exports: [MailJob],
})
export class MailModule {}
