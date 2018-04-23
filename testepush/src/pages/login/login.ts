import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
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
    public storage: Storage,
    private alertCtrl: AlertController
  ) 
    {

      this.model = new User();
      this.model.crm = '';
      this.model.password = '';
      this.model.token = '';
    }

    

  login() {
    console.log(this.model.crm+"\n"+this.model.password);
    if((this.model.crm != null && this.model.crm.length >= 5) && (this.model.password != null && this.model.password.length >= 5)){

    
    this.userProvider.login(this.model.crm, this.model.password, this.model.token_push)
      .then((result: any) => {
          this.toast.create({ message: 'Usuário logado com sucesso. Token: ' + result.token, position: 'botton', duration: 3000 }).present();
          //console.log(result.token);
          
          this.model = result;
          console.log(this.model.medico);
          this.storage.set('login_token', this.model.token);
          this.storage.set('login_nome', this.model.medico);
          this.storage.set('login_usuario', this.model.crm);
          //console.log(this.model.nome);
          //console.log(this.model.crm);
          this.openHomePage();
           
        //Salvar o token no Ionic Storage para usar em futuras requisições.
        //Redirecionar o usuario para outra tela usando o navCtrl
        //this.navCtrl.pop();
        //this.navCtrl.setRoot()
      })
      .catch((error: any) => {
        this.presentAlertInvalidLogin();
      });
      this.presentLoading();
    }else{
      this.presentAlertInvalidLogin();
      }
    }
  

  presentLoading() {
    this.loadingCtrl.create({
      content: 'Por favor aguarde...',
      duration: 2000,
      dismissOnPageChange: true
    }).present();
  }

  openHomePage(){
    this.navCtrl.setRoot(HomePage,this.model);
  }

  presentAlertInvalidLogin() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      subTitle: 'Usuário ou senha inválido!',
      buttons: ['Ok']
    });
    alert.present();
  }



}

export class User {
  medico: string;
  crm: string;
  password: string;
  token: string;
  token_push: string;
}