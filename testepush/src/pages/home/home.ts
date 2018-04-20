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
      this.model.nome = 'Sardinha Manu';//navParams.data.nome;
      this.model.token = navParams.data.token;
      this.model.token_push = navParams.data.token_push;
    }
    
    logout(){
      this.navCtrl.setRoot(LoginPage);
      this.storage.set('loged', 'true');
    }
}

export class User {
  nome: string;
  token: string;
  token_push: string;
}