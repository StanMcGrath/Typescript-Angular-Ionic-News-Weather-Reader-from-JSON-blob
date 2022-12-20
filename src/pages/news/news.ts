import { Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage implements OnInit {

  articles : any[];
  countryCode : string;
  citySettings : any;
  hidden : boolean = true;
  

  constructor(public navCtrl: NavController, private storage : Storage, private hc: HttpClient) {
  }

  
  ionViewDidEnter() {
	  console.log("now starting get array");
	this.getData3().subscribe(data4 => {
	  this.articles = data4.articles;
	  console.log(data4.articles);
	  if (data4.articles.length == 0) {
		this.hidden = false;
	} else {
		this.hidden = true;
	}
      });
	console.log("now finishing get array");
	
  }
  
  getData3(): Observable<any> {
	  return this.hc.get("https://newsapi.org/v2/top-headlines?country="+this.countryCode+"&apiKey=29a02c5f622b43c3b97d57a0de3826f7")
  }
  
  getData(): Observable<any> {
	  return this.hc.get("https://restcountries.com/v3.1/capital/"+this.citySettings)
  }

  
  ngOnInit() {	  
  
  this.storage.get("citySettings")
		.then((data) => {
			this.citySettings = data;
			this.getData().subscribe(data2 => {
			this.countryCode = data2[0].cca2;
			console.log(this.countryCode); 
		});
		})
		.catch((err) => {
			alert("Error accessing storage");
		});
 
  }

}
