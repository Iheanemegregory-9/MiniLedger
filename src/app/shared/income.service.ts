import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private firestore: Firestore) { }

  addNewIncome(description:string, source:string, price:number, date:Date){

    const colRef = collection(this.firestore, 'Income');
    return addDoc(colRef, {description, source, price, date})
  }

  getIncomeData(id:string){
    const colRef = collection(this.firestore, 'Income');
    return collectionData(colRef, {idField: id})
  }

  
}
