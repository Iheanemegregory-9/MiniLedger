import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {



  const user = localStorage.getItem('user');

  const router = inject(Router)

  if(user){

    return true

  }else{
    alert("You must be logged in to view this page")
    router.navigate(['login'])
    return false
  }
};
