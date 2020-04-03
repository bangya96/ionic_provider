import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingController } from '@ionic/angular';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
      private modalController: ModalController,
      private authService: AuthService,
      private navCtrl: NavController,
      private alertService: AlertService,
      public loadingController: LoadingController,
      private appComponent: AppComponent,
  ) { }

  ngOnInit() {
  }

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  register(form: NgForm) {
    this.appComponent.showLoader();
    this.authService.register(form.value.name,form.value.username, form.value.email, form.value.password).subscribe(
        data => {
          this.appComponent.hideLoader();
          // this.alertService.presentToast("Logged In");
        },
        error => {
          console.log(error);
          // this.alertService.presentToast(error['error']['error']);
          this.alertService.presentToast("Invalid data");
          this.appComponent.hideLoader();
        },
        () => {
          this.dismissLogin();
          this.navCtrl.navigateRoot('/home');
        }
    );
  }

}
