import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AngularSplitModule } from 'angular-split';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScratchpadComponent } from './scratchpad/scratchpad.component';
import { EditorComponent } from './editor/editor.component';
import { ResultComponent } from './result/result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ScratchpadComponent,
    EditorComponent,
    ResultComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    CodemirrorModule,
    AngularSplitModule,
    RouterModule.forRoot([]),
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
