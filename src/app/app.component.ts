import { Component } from '@angular/core';
import {Platform, NavController, LoadingController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService} from './services/auth.service';
import { AlertService} from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

    loaderToShow: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    public loadingController: LoadingController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
        this.authService.getToken();

        if (this.authService.isLoggedIn = true){
            this.navCtrl.navigateRoot('/home');
        }
    });
  }

    showLoader() {
        this.loaderToShow = this.loadingController.create({
            message: 'Loading...'
        }).then((res) => {
            res.present();
        });
    }

    hideLoader() {
        setTimeout(() => {
            this.loadingController.dismiss();
        }, 100);
    }

  logout() {
    this.authService.logout().subscribe(
        data => {
          this.alertService.presentToast(data);
        },
        error => {
          console.log(error);
        },
        () => {
          this.navCtrl.navigateRoot('/login');
        }
    );
  }

}
