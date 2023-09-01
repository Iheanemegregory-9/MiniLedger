import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore, collectionData, doc, getDoc, Timestamp, deleteDoc, updateDoc } from '@angular/fire/firestore';
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


  // get User specific data

  getUserData(id:string){
    const userDocRef = doc(this.firestore, `Users`, id)
    const userSnap = getDoc(userDocRef)
    return userSnap
  }


  // add new Expense

  setUserExpense(description:string, category:string, price:number, date:Timestamp, id:string){
    const userRef = collection(this.firestore, 'Users', id, 'Expenses');
    const userExpenseData = addDoc(userRef, {
      description,
      category,
      price,
      date,
    })
    return userExpenseData;
  }

  getUserExpense(id:string){
  const userExenseRef = collection(this.firestore, `Users/${id}/Expenses`);
  const userExpenses = collectionData(userExenseRef, {idField: 'id'})
  return userExpenses
  }

  getUserExpenseById(userId:string, expenseId:string){
    const userRes = collection(this.firestore, `Users/${userId}/Expenses`);
   const userExpenseData = doc(userRes, expenseId)
   return getDoc(userExpenseData)
  }

  editUserIncome(description:string, category:string, price:number, date:any, userId:string, incomeId:string){
    const userRes = collection(this.firestore, `Users/${userId}/Expenses`);
    const expenseRef = doc(userRes, incomeId)
   return updateDoc(expenseRef, {
      description,
      category,
      price,
      date
    });
  }

  deleteUerExpense(userId:string, expenseId:string){
    const userRes = collection(this.firestore, `Users/${userId}/Expenses`);
     const expensesRef = doc(userRes, expenseId)
     return deleteDoc(expensesRef)
    }
}
