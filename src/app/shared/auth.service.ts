import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, user, onAuthStateChanged, User } from '@angular/fire/auth';
import { collection, doc, addDoc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  currentUser(){
    return this.auth.currentUser
  }

  constructor(private auth: Auth, private firestore : Firestore) { }

  createAccount(email:string, password:string){
  return createUserWithEmailAndPassword(this.auth, email, password);
  }

  setUserDetails(firstName:string, email:string, lastName:string, userID:string){
    const userColRef = doc(this.firestore, 'Users', userID);
    return setDoc(userColRef, {email, firstName, lastName, userID})
  }

  sendEmailVerification(user:any){
   return  sendEmailVerification(user)
  }

  signIn(email:string, password:string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  signOut(){
   return signOut(this.auth)
  }

  resetPassword(email:string){
   return sendPasswordResetEmail(this.auth, email)
  }

  
}
