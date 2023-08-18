import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private firestore : Firestore) { }

  createNewExpense(description:string, category:any, price:number, date:Date){
    const colRef = collection(this.firestore, 'Expenses');
    return addDoc( colRef, {description, category, price, date})
  }

  getExpenses(){
    const colRef = collection(this.firestore, 'Expenses')
    return collectionData(colRef, {idField: 'id'})
  }

  getExpensesID(id:string){
    const docRef = doc(this.firestore, `Expenses/${id}`)
   const docSnap = getDoc(docRef);
    return docSnap;
  }

  getUserData(id:string){
    const userDocRef = doc(this.firestore, `Users`, id)
    const userSnap = getDoc(userDocRef)
    return userSnap
  }
}
