import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { NewsPage } from '../news/news';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
	hidden : boolean = false;
	hidden2 : boolean = true;
	hidden3 : boolean = true;
	green : boolean = true;
	blue : boolean = true;
	red : boolean = true;
	orange : boolean = true;
	unitSettings : any; 
	citySettings : any;
	countryName : any;
	countryCode : any;
	countryFlag : any;
	lat : any;
	lon : any;
	temp : number;
	description : any;
	icon : any;
	wind : any;
	testLocation : any;
	unit : string; 
	obtime : any;
	

	
  constructor(public navCtrl: NavController, private storage : Storage, private hc: HttpClient) {
console.log("constructor");
  }
  
  openSettings() {
	  this.navCtrl.push(SettingsPage);
  }
  
  openNews() {
	 this.navCtrl.push(NewsPage);
  }
  
  celsiusToFahrenheit(x : number) : number {
	  let y : number = (x * (9/5) + 32)
	  return y;
  }
  
  celsiusToKelvin(x : number) : number {
	  let z : number = (x + 273.15)
	  return z;
  }
  
  unitFunction(x : number) {
	 
	  if (this.unitSettings == "fahrenheit" ) {
		  this.temp = this.celsiusToFahrenheit(x);
		  this.unit = "F";
      
	  } else if (this.unitSettings == "scientific") {
		  this.temp = this.celsiusToKelvin(x);
		  this.unit = "K";
	  } else {
		  this.temp = this.temp;
		  this.unit = "C";
	  }
	  
	  
  }
  
  getData(): Observable<any> {
	  return this.hc.get("https://restcountries.com/v3.1/capital/"+this.citySettings)
  }
  
  getData2(): Observable<any> {
	  return this.hc.get("http://api.weatherbit.io/v2.0/current?City="+this.citySettings+"&Lat="+this.lat+"&long="+this.lon+"&key=f70ff56abe4143c58388b14827367b85")
  }
  
  tempCheck(x : number) {
	  
	  if (x>=30) {
		  this.green = true;
		  this.blue  = true;
		  this.red = false;
		  this.orange = true;
	  } else if (x>=23) {
		  this.green = true;
		  this.blue  = true;
		  this.red = true;
		  this.orange = false;
	  } else if (x>=10) {
		  this.green = false;
		  this.blue  = true;
		  this.red = true;
		  this.orange = true;
	  } else {
		  this.green = true;
		  this.blue  = false;
		  this.red = true;
		  this.orange = true;
	  }
	  
  }
  
  resetStorage(){
  this.storage.clear();
  this.navCtrl.push(HomePage);
}
  
  ionViewWillEnter() {
		this.storage.get("citySettings")
		.then((data) => {
			this.citySettings = data;
			if (this.citySettings != null) {
				this.getData().subscribe(data2 => {
				  this.countryName = (data2[0].name.common);
				  this.countryCode = data2[0].cca2;
				  this.countryFlag = data2[0].flags.png;
				  this.lat = data2[0].latlng[0];
				  this.lon = data2[0].latlng[1];
				  this.hidden = true;
				  this.hidden2 = false;
				  this.hidden3 = true;
				},
				error => {
					this.hidden = true;
					this.hidden2 = true;
					this.hidden3 = false;
				});
			}
		})
		.catch((err) => {
			alert("Error accessing storage");
		});
		
		 this.storage.get("unitSettings")
		.then((data) => {
			this.unitSettings = data;
			this.getData2().subscribe(data3 => {
			this.temp = data3.data[0].temp
			this.tempCheck(this.temp);
			this.description = data3.data[0].weather.description;
			this.icon = data3.data[0].weather.icon;
			this.wind = data3.data[0].wind_cdir_full;
			this.obtime = data3.data[0].ob_time;
			this.testLocation = data3.data[0].city_name;
			this.unitFunction(this.temp);	 					
			});
		})
		.catch((err) => {
			alert("Error accessing storage");
		});
		
	  
  }

}
