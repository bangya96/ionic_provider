import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token:any;
  constructor(
      private http: HttpClient,
      private storage: NativeStorage,
      private env: EnvService,
  ) { }

  login(username: String, password: String) {
    return this.http.post(this.env.API_URL + 'api/login',
        {username: username, password: password}
      // {username: 'user', password: '123456'}
    ).pipe(
        tap(token => {
          this.storage.setItem('token', token['success']['token'])
              .then(
                  () => {
                    console.log('Token Stored');
                  },
                  error => console.error('Error storing item', error)
              );
          this.token = token['success']['token'];
          this.isLoggedIn = true;
          return token['success']['token'];
        }),
    );
  }

    register(name: String, username: String, email: String,password: String) {
        return this.http.post(this.env.API_URL + 'api/register',
            {name: name, username: username, email: email, password: password}
        ).pipe(
            tap(token => {
                this.storage.setItem('token', token['success']['token'])
                    .then(
                        () => {
                            console.log('Token Stored');
                        },
                        error => console.error('Error storing item', error)
                    );
                this.token = token['success']['token'];
                this.isLoggedIn = true;
                return token['success']['token'];
            }),
        );
    }

  logout() {
    const headers = new HttpHeaders({
        'Authorization': "Bearer "+this.token
    });
    return this.http.get(this.env.API_URL + 'api/logout', { headers: headers })
        .pipe(
            tap(data => {
              this.storage.remove("token");
              this.isLoggedIn = false;
              delete this.token;
              return data;
            })
        )
  }
  user() {
    const headers = new HttpHeaders({
      'Authorization': "Bearer "+this.token
    });
    return this.http.get(this.env.API_URL + 'api/details', { headers: headers })
        .pipe(
            tap(user => {
              return user;
            })
        )
  }

  getToken() {
    return this.storage.getItem('token').then(
        data => {
          this.token = data;
          if(this.token != null) {
            this.isLoggedIn=true;
          } else {
            this.isLoggedIn=false;
          }
        },
        error => {
          this.token = null;
          this.isLoggedIn=false;
        }
    );
  }

    slider() {
        const headers = new HttpHeaders({
            'Authorization': "Bearer "+this.token
        });
        return this.http.get(this.env.API_URL + 'api/slider', { headers: headers })
            .pipe(
                tap(item => {
                    return item;
                })
            )
    }
}
