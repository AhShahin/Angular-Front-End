import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import {ConfirmationPageComponent} from "./confirmation-page/confirmation-page.component";
import {ListingPageComponent} from "./listing-page/listing-page.component";

const appRoutes: Routes = [
  {path: 'registration', component: RegistrationFormComponent},
  {path: 'confirmation', component: ConfirmationPageComponent},
  {path: 'usersList', component: ListingPageComponent},
  { path: '',   redirectTo: 'registration', pathMatch: 'full' },
  { path: '**',   component: RegistrationFormComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
