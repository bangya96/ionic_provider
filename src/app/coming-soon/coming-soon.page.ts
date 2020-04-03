import { Component, OnInit } from '@angular/core';
import {NavController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.page.html',
  styleUrls: ['./coming-soon.page.scss'],
})
export class ComingSoonPage implements OnInit {

  public subscription;

  constructor(
      private platform: Platform,
      private navCtrl: NavController,
  ) {
    this.subscription = this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/home');
    });
  }

  ngOnInit() {
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

}
