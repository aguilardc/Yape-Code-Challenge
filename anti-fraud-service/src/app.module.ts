import {Module} from '@nestjs/common';
import { AntifraudModule } from './modules/antifraud/antifraud.module';


@Module({
    imports: [AntifraudModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
