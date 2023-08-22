import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, updateDoc, query, where, Timestamp } from '@angular/fire/firestore';
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
 


  // User specific data 
  getUserData(id:string){
    const userDocRef = doc(this.firestore, `Users`, id)
    const userSnap = getDoc(userDocRef)
    return userSnap
  }

  setUserIncome(description:string, source:string, price:number, date:Timestamp, id:string){
    const userRef = collection(this.firestore, 'Users', id, 'Income');
    const userIncomeData = addDoc(userRef, {
      description,
      source,
      price,
      date,
    })
    return userIncomeData;
  }

  getUserIncome(id:string){
   const userRes = collection(this.firestore, `Users/${id}/Income`);
   const userIncomeData = collectionData(userRes, {idField: 'id'})
   return userIncomeData
  }




  
}
