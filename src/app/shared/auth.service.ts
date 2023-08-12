import { Injectable } from '@angular/core';
import { signInAnonymously, signInWithEmailAndPassword, signOut, Auth, createUserWithEmailAndPassword, authState, sendPasswordResetEmail, sendEmailVerification, sendSignInLinkToEmail, User, user, } from '@angular/fire/auth';
import { collection, doc, addDoc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore : Firestore) { }

  createAccount(email:string, password:string){
  return createUserWithEmailAndPassword(this.auth, email, password);
   
  }

  setUserDetails(firstName:string, lastName:string, id:string){
    const userColRef = doc(this.firestore, 'Users', id);
    return setDoc(userColRef, {firstName, lastName, id})
  }

  sendEmailVerification(email:any){
    return sendEmailVerification(email)
  }

  signIn(email:string, password:string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  signOut(){
   return signOut(this.auth)
  }

  currentUser(){
   return  user(this.auth)
  }

  resetPassword(email:string){
   return sendPasswordResetEmail(this.auth, email)
  }

  isUserAuthenticated(){
    if(this.auth.currentUser?.isAnonymous){
      console.log('user is not auth');
    } else if (!this.auth.currentUser?.isAnonymous){
      console.log('user is auth');
      
    }
  }
}
