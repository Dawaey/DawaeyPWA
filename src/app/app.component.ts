import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Main } from '../pages/main/main';
import { InteractionsPage } from '../pages/interactions/interactions';
import { PartenersPage } from '../pages/parteners/parteners';
import { SponsorsPage } from '../pages/sponsors/sponsors';
import { AboutPage } from '../pages/about/about';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { OneSignal } from '@ionic-native/onesignal';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'drugs';

  pages: Array<{ title: string, component: any, icon: string, url: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private ga: GoogleAnalytics, private oneSignal: OneSignal) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Drug Search', component: Main, icon: "home", url: "drugs" },
      { title: 'Drug Interactions', component: InteractionsPage, icon: "finger-print", url: "interactions" },
      { title: 'Parteners', component: PartenersPage, icon: "people", url: "parteners" },
      { title: 'Sponsors', component: SponsorsPage, icon: "cash", url: "sponsors" },
      { title: 'About', component: AboutPage, icon: "bug", url: "about" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if ((<any>window).cordova) {
        //start getting analytics
        this.ga.startTrackerWithId('UA-88642709-1')
          .then(() => {
            console.log('Google analytics is ready now');
          })
          .catch(e => console.log('Error starting GoogleAnalytics', e));

        //start registring and getting pushs
        this.oneSignal.startInit("daaa8674-68e2-49a3-aa58-3844d767a9aa", "1061030166084");
        /*this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
        });*/

        this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
          // do something when a notification is opened
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        });

        this.oneSignal.endInit();
      }










    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.url);
  }
}
