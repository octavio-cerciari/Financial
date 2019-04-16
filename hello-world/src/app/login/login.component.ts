import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
  ) { }

  onSubmit() {
    console.log('Entrou no SUBMIT');
    if (this.form.valid) {
      this.loginService.onLogin(this.form.value.username, this.form.value.password);
    } else {
      console.log(this.form.errors);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

}
