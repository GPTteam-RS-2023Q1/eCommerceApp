import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ProstotakComponent } from './components/prostotak/prostotak.component';

@NgModule({
  declarations: [AppComponent, ProstotakComponent],
  imports: [BrowserModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
