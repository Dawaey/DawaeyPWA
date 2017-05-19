import { Component, ViewChild } from '@angular/core';

import { DrugsService } from '../../providers/drugs-service';

import 'rxjs/add/operator/map';

import { NavController, AlertController, Content, IonicPage } from 'ionic-angular';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage({
  name:'drugs',
  segment: 'drugs'
})
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class Main {
  drugsInitial = []; //initialize your drugsInitial array empty
  drugs = []; //initialize your drugs array empty
  searchBy = "tradename";
  @ViewChild(Content) content: Content;



  constructor(public alertCtrl: AlertController, public navCtrl: NavController, private drugsService: DrugsService, private ga: GoogleAnalytics) {
    //setInterval(() => this.content.scrollToTop() , 250);
  };

  ionViewDidLoad() {
    this.ga.trackView('Main Screen')
    this.drugsService.getDrugs().subscribe(data => {
      this.drugsInitial = data;
      this.drugs = data;
    })
  }

  openDrug(id) {
    this.navCtrl.push('drugs-details', {
      id: id
    })
  }



  filterDrugs(ev) {
    // Reset drugs back to all of the drugs
    this.drugs = this.drugsInitial;

    //Scroll to top
    this.content.scrollToTop()

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the drugs
    if (val && val.trim() != '') {
      this.drugs = this.drugs.filter((drug) => {
        switch (this.searchBy) {
          case "tradename":
            return (drug.tradename.toLowerCase().indexOf(val.toLowerCase()) > -1);
          case "activeingredient":
            return (drug.activeingredient.toLowerCase().indexOf(val.toLowerCase()) > -1);
          case "maingp":
            return (drug.maingp.toLowerCase().indexOf(val.toLowerCase()) > -1);
          case "company":
            return (drug.company.toLowerCase().indexOf(val.toLowerCase()) > -1);
          case "howmany":
            return drug.howmany == val;
          case "price":
            return drug.price == val;
          default:
            return (drug.tradename.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
  }



  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose to search by ...');

    alert.addInput({
      type: 'radio',
      label: 'Tradename',
      value: 'tradename',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Activeingredient',
      value: 'activeingredient',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Price',
      value: 'price',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Category',
      value: 'maingp',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Company',
      value: 'company',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Drug Form',
      value: 'form',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Drug Quantity',
      value: 'howmany',
      checked: false
    });


    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.searchBy = data;
        console.log(data);

      }
    });
    alert.present();
  }







}
