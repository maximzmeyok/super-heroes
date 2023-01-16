import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.services';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainLayoutComponent } from './main/main-layout/main-layout.component';
import { AuthGuard } from './shared/services/auth.guard';
import { SelectionComponent } from './main/selection/selection.component';
import { HeroesService } from './shared/services/heroes.service';
import { HttpClientModule } from '@angular/common/http';
import { HeroCardComponent } from './shared/components/hero-card/hero-card.component';
import { AlphabetSelectComponent } from './main/alphabet-select/alphabet-select.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    MainLayoutComponent,
    SelectionComponent,
    HeroCardComponent,
    AlphabetSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    HeroesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
