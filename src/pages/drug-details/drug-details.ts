import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { DrugsService } from '../../providers/drugs-service';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage({
  name:'drugs-details',
  segment: 'drugs/:id',
  defaultHistory: ['drugs']
})
@Component({
  selector: 'page-drug-details',
  templateUrl: 'drug-details.html'
})
export class DrugDetails {
  id;
  drug:any;
  similars = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private drugsService:DrugsService, private ga: GoogleAnalytics) {
    let currentDrugAI;
    let id = navParams.get("id")


    this.drugsService.getDrugs()
      .subscribe(drugs => {

      for (let i = 0; i < drugs.length; i++) {
        if (drugs[i].id == id) {
          this.drug = drugs[i];
          currentDrugAI = drugs[i].activeingredient;
        }
      }
      for (let i = 0; i < drugs.length; i++) {
        if (drugs[i].activeingredient === currentDrugAI) {
          let obj = {
            id: drugs[i].id,
            tradename: drugs[i].tradename,
            price:drugs[i].price
          }
          this.similars.push(obj)          
        }
      }
      this.ga.trackView(this.drug.tradename)

      });
  }

  openDrug(id){
    this.navCtrl.push('drugs-details', {
      id: id
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DrugDetails');
  }

}
