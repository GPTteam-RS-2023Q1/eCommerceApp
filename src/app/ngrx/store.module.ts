import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './reducers/appReducers';
import { AuthEffects } from './effects/auth.effects';

@NgModule({
  imports: [StoreModule.forRoot(appReducers, {}), EffectsModule.forRoot([AuthEffects])],
})
export class AppStoreModule {}
