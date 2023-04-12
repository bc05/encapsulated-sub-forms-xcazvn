import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {SubFormComponent} from './sub-form/sub-form.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, ],
  declarations: [ AppComponent, SubFormComponent, ErrorComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
