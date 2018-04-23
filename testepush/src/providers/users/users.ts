import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


 
@Injectable()
export class UsersProvider {
  private API_URL = 'http://189.115.45.138:8081/webservice/rest/appi/';
  private API_URL_EXT = 'http://172.16.4.17:8081/webservice/rest/appi/';
  public token: string;
  //private header = new Headers();
  
  

  constructor(public http: Http) { }

  login(login: string, password: string, token_push: string) {
    
    return new Promise((resolve, reject) => {

      let postParams =  {
        'crm': login,
        'password': password,
        'token_push': token_push
      };

      //this.header.append('Content-Type','application/json');
      //this.header.append('Accept','application/json');
      //let options = new RequestOptions({headers:this.header});
      
      this.http.post(this.API_URL_EXT + 'login', postParams)
        .subscribe(
          (result: any) => {
            console.log(result);
            resolve(result.json());
            
          }, 
          error => {
            console.log(error);// Error getting the data
            resolve();
          });
      
        
    });
 
  }

  logout(token: string){
    return new Promise((resolve, reject) =>{
      
      this.http.get(this.API_URL_EXT + 'logout/'+token)
        .subscribe(
          (result: any) => {
            console.log(result);
            resolve(result.json());
          },
          error => {
            console.log(error);
            resolve();
          });
    });
  }

  // getAll(page: number) {
  //   return new Promise((resolve, reject) => {

  //     let url = this.API_URL_EXT + 'users/?per_page=10&page=' + page;

  //     this.http.get(url)
  //       .subscribe((result: any) => {
  //         resolve(result.json());
  //       },
  //       (error) => {
  //         reject(error.json());
  //       });
  //   });
  // }

  // get(id: number) {
  //   return new Promise((resolve, reject) => {
  //     let url = this.API_URL_EXT + 'users/' + id;

  //     this.http.get(url)
  //       .subscribe((result: any) => {
  //         resolve(result.json());
  //       },
  //       (error) => {
  //         reject(error.json());
  //       });
  //   });
  // }
}