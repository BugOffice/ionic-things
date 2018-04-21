import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  model: User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toast: ToastController, 
    private userProvider: UsersProvider,
    private storage: Storage) 
    {
      this.model = new User();
      
      this.storage.get('login_nome').then((val) => {
        this.model.nome = val;
      });
      this.storage.get('login_usuario').then((val) => {
        this.model.crm = val;
      });
      this.model.token = navParams.data.token;
      console.log(this.model.nome);
     // this.model.token_push = navParams.data.token_push;
    }
    
    logout(){
      //this.navCtrl.setRoot(LoginPage);
      
      this.storage.set('loged', 'false');
      this.storage.get('login_token').then((val) => {
        this.userProvider.logout(val);
        console.log('Value of token, get of Storage: '+val);
        this.storage.set('login_token',null);
      });
      this.navCtrl.insert(0,LoginPage);
      this.navCtrl.popToRoot();

    }
}

export class User {
  nome: string;
  token: string;
  token_push: string;
  crm: string;
}