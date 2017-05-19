import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage({
  name:'parteners',
  segment: 'parteners'
})
@Component({
  selector: 'page-parteners',
  templateUrl: 'parteners.html'
})
export class PartenersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private ga: GoogleAnalytics) {}

  ionViewDidLoad() {
    this.ga.trackView('Parteners Screen')
  }

}
