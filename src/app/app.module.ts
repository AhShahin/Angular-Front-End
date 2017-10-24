import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import {AppRoutingModule} from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {UserService} from "./services/user.service";
import { ListingPageComponent } from './listing-page/listing-page.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    NavbarComponent,
    FooterComponent,
    ListingPageComponent,
    ConfirmationPageComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
