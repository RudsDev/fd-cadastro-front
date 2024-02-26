import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroFormComponent } from './modules/cadastro/page/cadastro-form/cadastro-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './modules/cadastro/components/error-message/error-message.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorNotificationComponent } from './modules/cadastro/components/error-notification/error-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroFormComponent,
    ErrorMessageComponent,
    ErrorNotificationComponent,
  ],
  imports: [
    PanelModule,
    MessagesModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
