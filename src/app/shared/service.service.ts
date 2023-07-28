import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore, collectionData,  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // expneses!:Observable<any>

  
  constructor(private firestore : Firestore) { }

  createNewExpense(description:string, category:any, price:number, date:Date){
    const colRef = collection(this.firestore, 'Expenses');
    return addDoc( colRef, {description, category, price, date})
  }

  getExpenses(){
    const colRef = collection(this.firestore, 'Expenses')
    return collectionData(colRef)
  }

  getExpensesID(id:string){
    const colRef = collection(this.firestore, `Expenses/${{id}}`)
    return collectionData(colRef, {idField: 'id'},)
  }

}
