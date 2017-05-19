import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartenersPage } from "./parteners";

@NgModule({
  declarations: [
    PartenersPage,
  ],
  imports: [
    IonicPageModule.forChild(PartenersPage),
  ],
  exports: [
    PartenersPage
  ]
})
export class PartenersPageModule {}
