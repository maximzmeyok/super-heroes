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
import { RecentSearchComponent } from './main/recent-search/recent-search.component';
import { UserInfoPageComponent } from './main/user-info-page/user-info-page.component';
import { HeroesListComponent } from './main/heroes-list/heroes-list.component';
import { BattlesHistoryComponent } from './main/battles-history/battles-history.component';
import { PowerUpsComponent } from './main/power-ups/power-ups.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    MainLayoutComponent,
    SelectionComponent,
    HeroCardComponent,
    AlphabetSelectComponent,
    RecentSearchComponent,
    UserInfoPageComponent,
    HeroesListComponent,
    BattlesHistoryComponent,
    PowerUpsComponent,
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
