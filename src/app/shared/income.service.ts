import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';

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
 

  


  getUserData(id:string){
    const userDocRef = doc(this.firestore, `Users`, id)
    const userSnap = getDoc(userDocRef)
    return userSnap
  }




  
}
