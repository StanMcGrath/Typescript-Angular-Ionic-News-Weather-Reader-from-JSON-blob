import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
	
	unitSettings : string;
	citySettings : string;
	newCity : string;

  constructor(public navCtrl: NavController, private storage: Storage) {
  }

  ionViewWillEnter() {
	  
	  this.storage.get("unitSettings")
		.then((data) => {
			this.unitSettings = data;
		})
		.catch((err) => {
			alert("Error accessing storage");
		});
		
		 this.storage.get("citySettings")
		.then((data) => {
			this.citySettings = data;
		})
		.catch((err) => {
			alert("Error accessing storage");
		});
  }
  
  saveSettings() {
	  
	  if (this.newCity == null && this.citySettings == null) {
		  alert("Please enter a city before saving!");
	  }
	  
	  else if (this.citySettings != null && this.newCity == null) {
				if(this.unitSettings == null) {
				this.unitSettings = "metric";
				}
				this.storage.set("unitSettings", this.unitSettings);
				this.storage.set("citySettings", this.citySettings);
				this.navCtrl.pop();
		
	  }
	  
	  else {
	  
		if(this.unitSettings == null) {
			this.unitSettings = "metric";
		}
		this.citySettings = this.newCity;
		this.storage.set("unitSettings", this.unitSettings);
		this.storage.set("citySettings", this.citySettings);
		this.navCtrl.pop();
	  
	  }
  }
  
}
