import { Component, OnInit } from '@angular/core';
import { MenuController, Platform  } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public items;
  user = User ;
  public subscription;

  constructor(
      private menu: MenuController,
      private authService: AuthService,
      private alertService: AlertService,
      private navCtrl: NavController,
      private appComponent: AppComponent,
      private platform: Platform,
  ) {
    this.menu.enable(true);
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
      this.appComponent.showLoader();
    this.authService.user().subscribe(
        user => {
          this.user = user["success"];
            this.appComponent.hideLoader();
        },
        error => {
          this.appComponent.logout();
            this.appComponent.hideLoader();
          console.log(error);
        }
    );
    this.authService.slider().subscribe(
        slider => {
          this.items = slider;
        }
    );

    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
  }

  logout(){
    this.appComponent.logout();
  }

  profile(){
    this.navCtrl.navigateRoot('/profile');
  }

  ewallet(){
    this.navCtrl.navigateRoot('/ewallet');
  }

  income(){
    this.navCtrl.navigateRoot('/monthly-bonus-statement');
  }

  agent(){
    this.navCtrl.navigateRoot('/network-agent-count');
  }

  sales(){
    this.navCtrl.navigateRoot('/group-sales');
  }

  soon(){
    this.navCtrl.navigateRoot('/coming-soon');
  }

  viewPlan(){
    this.navCtrl.navigateRoot('/marketing-plan');
  }

  brand(){
    this.navCtrl.navigateRoot('/brand-list');
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

}
