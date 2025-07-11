import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { NgxMaskModule } from 'ngx-mask';
import { LoginComponent } from './components/login/login.component';
import { CreateBolaoComponent } from './components/create-bolao/create-bolao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateBolaoComponent } from './components/update-bolao/update-bolao.component';
import { OutcomeBolaoComponent } from './components/outcome-bolao/outcome-bolao.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ListBolaoComponent } from './components/list-bolao/list-bolao.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    CreateBolaoComponent,
    UpdateBolaoComponent,
    OutcomeBolaoComponent,
    SignUpComponent,
    ListBolaoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
