import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authCode: string | null = null;
  private google?:any

  constructor(private readonly http:HttpClient, private readonly activatedRoute:ActivatedRoute) {
    this.google = (window as any).google;
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params=>this.authCode=params.get('code'))
  }

  login() {

      const client = this.google.accounts.oauth2.initCodeClient ({
      client_id: '574472089104-tbher5us71us3obvvan9g90ecsuqpmdm.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/userinfo.profile \
       https://www.googleapis.com/auth/userinfo.email',
      ux_mode: 'redirect',
      redirect_uri: "https://auth-test-neon.vercel.app/success",
      });
    
    client.requestCode();

  }
  
  getToken() {
    this.http.post('https://oauth2.googleapis.com/token', {
    code: this.authCode,
   client_id: "YOUR_GOOGLE_CLIENT_ID",
   client_secret: "YOUR_GOOGLE_CLIENT_SECRET",
   redirect_uri: "http://localhost:3000",
   grant_type: "authorization_code"
    }).subscribe(res=>console.log(res))
  }

    getUserInfo(token:string): Observable<any> {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Failed to get user info', error);
        return [];
      })
    );
  }
}
