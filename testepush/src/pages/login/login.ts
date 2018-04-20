import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  model: User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toast: ToastController, 
    private userProvider: UsersProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) 
    {
      this.isLoged();
      this.model = new User();
      this.model.crm = '015761';
      this.model.password = 'Aebel13@';
    }

  login() {

    this.userProvider.login(this.model.crm, this.model.password)
      .then((result: any) => {
          this.toast.create({ message: 'Usuário logado com sucesso. Token: ' + result.token, position: 'botton', duration: 3000 }).present();
          
          this.openHomePage();
           
        //Salvar o token no Ionic Storage para usar em futuras requisições.
        //Redirecionar o usuario para outra tela usando o navCtrl
        //this.navCtrl.pop();
        //this.navCtrl.setRoot()
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao efetuar login. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
      this.presentLoading();
  }

  presentLoading() {
    this.loadingCtrl.create({
      content: 'Por favor aguarde...',
      duration: 5000,
      dismissOnPageChange: true
    }).present();
  }

  openHomePage(){
    this.navCtrl.setRoot(HomePage);
  }

  isLoged(){
    let loged;
    this.storage.get('loged').then((val) =>{
      if(val == 'true'){
        this.openHomePage();
      }
    });
  }
}

export class User {
  nome: string;
  crm: string;
  password: string;
  token: string;
  token_push: string;
}