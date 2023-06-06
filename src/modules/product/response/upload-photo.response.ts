import {Expose} from 'class-transformer';

export default class UploadImageResponse {
  @Expose()
  public photo!: string;
  
  @Expose()
  public filepath!: string;
}

