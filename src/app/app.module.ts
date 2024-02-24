import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroFormComponent } from './modules/cadastro/page/cadastro-form/cadastro-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './modules/cadastro/components/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroFormComponent,
    ErrorMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
