import { Injectable } from '@angular/core';
import { signInAnonymously, signInWithEmailAndPassword, signOut, Auth, createUserWithEmailAndPassword, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  createAccount(email:string, password:string){
   return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email:string, password:string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  signOut(){
   return signOut(this.auth)
  }

  currentUser(){
    authState(this.auth)
  }
}
