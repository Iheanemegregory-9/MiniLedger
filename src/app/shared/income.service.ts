import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  addNewIncome(description:string, source:string, price:number, date:Date){

    const colRef = collection(this.firestore, 'User');
    return addDoc(colRef, {description, source, price, date})
  }

  getIncomeData(){
    const colRef = collection(this.firestore, 'Income');
    return collectionData(colRef, {idField: 'id'})
  }

  getIncomeID(id:string){
    const docRef = doc(this.firestore, `Income/${id}`)
    const docSnap = getDoc(docRef);
    return docSnap;
  }
 

  // User specific income <<<<< The code below allows user to read and write thier own income without affecing other users code


  getUserData(){
    const colRef = collection(this.firestore, 'Users');
    return collectionData(colRef, {idField: 'id'});
  }




  
}
