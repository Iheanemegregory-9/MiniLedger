import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';


import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';


registerLicense(environment.syncFusionKey);





platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
