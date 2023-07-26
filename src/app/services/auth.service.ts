import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl : string = "https://localhost:7210/api/User/";

  constructor(private http : HttpClient, private router: Router) { }

  signUp(userObj : any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }

  storeToken(tokenvalue : string){
    localStorage.setItem('token',tokenvalue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn() : boolean{
    return !!localStorage.getItem('token');
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
