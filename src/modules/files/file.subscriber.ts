import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { File } from './file.entity';
import { ImgproxyService } from './imgproxy.service';

@EventSubscriber()
export class FileSubscriber implements EntitySubscriberInterface<File> {
  constructor(
    connection: Connection,
    private imgproxyService: ImgproxyService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo(): any {
    return File;
  }

  async afterLoad(file: File) {
    file.url = this.imgproxyService.getSignedUrl(file.uuid, 0, 0, 'force');
  }
}
