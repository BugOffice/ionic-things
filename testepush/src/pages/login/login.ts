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
      this.model.crm = '';
      this.model.password = '';
      this.model.token = '';
      
      this.storage.get('login_token').then((val) => {
        this.model.token = val;
        console.log('Value of token storaged in browser: '+val);
        if(this.model.token){
          this.openHomePage();
          this.storage.get('login_nome').then((val) => {
            this.model.medico = val;
          });
          this.storage.get('login_usuario').then((val) => {
            this.model.crm = val;
          });
        }
      });
    }

  login() {

    this.userProvider.login(this.model.crm, this.model.password)
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
    this.navCtrl.setRoot(HomePage,this.model);
  }

  isLoged(){
    
    this.storage.get('loged').then((val) =>{
      if(val == 'true'){
        this.openHomePage();
      }
    });
  }
}

export class User {
  medico: string;
  crm: string;
  password: string;
  token: string;
  token_push: string;
}