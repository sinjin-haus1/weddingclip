import { Module, Global } from '@nestjs/common';
import { GooglePlacesService } from './google-places.service';

@Global()
@Module({
  providers: [GooglePlacesService],
  exports: [GooglePlacesService],
})
export class GooglePlacesModule {}
