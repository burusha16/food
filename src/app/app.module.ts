import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';

import { DeviceWindowService } from './shared/device-window.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [DeviceWindowService],
  bootstrap: [AppComponent]
})
export class AppModule {
  contsructor() {
  }
}
