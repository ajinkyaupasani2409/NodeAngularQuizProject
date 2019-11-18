import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthGuard } from '../auth.guard';
import { HttpClient } from '@angular/common/http';


declare var require: any; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService,AuthGuard]
})
export class LoginComponent implements OnInit {
  name : string;
  passward : string;
  error:string;
  login:any;

  constructor(private http: HttpClient, private fb?: FormBuilder,private router?: Router,  private auth?: AuthService) {}
   

  ngOnInit() {
    
  }
      
  welcomeMe(uname:string,pwd:string) {
      this.http.get('http://localhost:3000/').subscribe(res=>{
      console.log(res);
      this.login = res;
      this.name = uname;
      this.passward = pwd;
      for(let data in this.login) {
            console.log(this.name);
            console.log("login ", this.login[data].name);
      if(this.name==(this.login[data].name) && this.passward === this.login[data].passward) {
      this.auth.sendToken(this.login[data].name);
      this.router.navigate(['/home']);
      break;

      }
      else{
        this.error = "Check the credentials";
      }
    }
      });
      
    }
    
    
}
