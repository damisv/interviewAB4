import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent, DetailsComponent, HomepageComponent} from './components';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule, MaterialModule} from './modules';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }