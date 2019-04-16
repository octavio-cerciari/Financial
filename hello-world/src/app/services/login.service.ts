import { Injectable } from '@angular/core';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

    onLogin(username: string, password: string) {
      console.log(username);
      console.log(password);
      if (username === 'octavio' && password === '1234') {
        this.router.navigate(['dash']);
      } else {
        console.log('USUARIO OU SENHA INVALIDOS');
      }
   }

  constructor(private router: Router) { }
}
