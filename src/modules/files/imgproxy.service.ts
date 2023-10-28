import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import createHmac = require('create-hmac');

@Injectable()
export class ImgproxyService {
  constructor(private configService: ConfigService) {}

  getSignedUrl(
    id: string,
    width: number,
    height: number,
    resizing: string,
  ): string {
    const bucket = this.configService.get('STORAGE_BUCKET');
    const key = this.configService.get('IMGPROXY_KEY');
    const salt = this.configService.get('IMGPROXY_SALT');
    const url = this.configService.get('IMGPROXY_URL');

    const urlSafeBase64 = (string: Buffer | String) => {
      return Buffer.from(string)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    };

    const hexDecode = (hex: string) => {
      return Buffer.from(hex, 'hex');
    };

    const sign = (salt: string, target: string, secret: string) => {
      const hmac = createHmac('sha256', hexDecode(secret));
      hmac.update(hexDecode(salt));
      hmac.update(target);
      return urlSafeBase64(hmac.digest());
    };

    const plain_url = `gs://${bucket}/${id}`;
    const resizing_type = resizing;
    const gravity = 'no';
    const enlarge = 1;
    const extension = 'jpg';
    const encoded_url = urlSafeBase64(plain_url);
    let path = `/rs:${resizing_type}:${width}:${height}:${enlarge}/g:${gravity}/${encoded_url}.${extension}`;
    const signature = sign(salt, path, key);

    return `${url}/${signature}${path}`;
  }
}
