import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {CoreModule} from './@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/modules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { LoaderComponent } from './shared/components/loader/loader.component';
import { HomeComponent } from './components/home/home.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { HeaderComponent } from './shared/components/header/header.component';

import {CitiesService} from './shared/services/cities.service';
import {LoaderService} from './shared/services/loader.service';
import {WeatherService} from './shared/services/weather.service';
import { AddZeroPipe } from './shared/pipes/add-zero.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HomeComponent,
    FavoriteComponent,
    HeaderComponent,
    AddZeroPipe,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CitiesService,
    LoaderService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
