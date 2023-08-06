import { Injectable } from '@angular/core';
import { signInAnonymously, signInWithEmailAndPassword, signOut, Auth, createUserWithEmailAndPassword, authState } from '@angular/fire/auth';
import { collection, doc, addDoc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore : Firestore) { }

  createAccount(email:string, password:string,){
   return createUserWithEmailAndPassword(this.auth, email, password,)
  }

  linkUsertoDB(userID:string, userIsAnon:boolean){
    const userRef = collection(this.firestore, 'Users');
    addDoc(userRef, {
      userID,
      userIsAnon,
    })
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
