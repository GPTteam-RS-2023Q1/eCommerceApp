import { isDevMode, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthEffects } from './effects/auth.effects';
import { CatalogEffects } from './effects/catalog.effects';
import { appReducers } from './reducers/appReducers';

@NgModule({
  imports: [
    StoreModule.forRoot(appReducers, {}),
    EffectsModule.forRoot([AuthEffects, CatalogEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
})
export class AppStoreModule {}
