import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class UsersProvider {
  private API_URL = 'http://189.115.45.138:8081/webservice/rest/appi/'
  public token: string;
  //private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS, HEAD' });
  //private options = new RequestOptions({ headers: this.headers });

  constructor(public http: Http) { }

  login(login: string, password: string) {
    return new Promise((resolve, reject) => {

      let postParams =  {
        'crm': login,
        'password': password
      };
      
      this.http.post(this.API_URL + 'login', postParams)
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

  // getAll(page: number) {
  //   return new Promise((resolve, reject) => {

  //     let url = this.API_URL + 'users/?per_page=10&page=' + page;

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
  //     let url = this.API_URL + 'users/' + id;

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