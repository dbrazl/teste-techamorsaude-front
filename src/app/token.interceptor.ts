import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let router = Inject(Router);

  try {

  } catch (error) {

  }

  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken = jwtDecode(token);

      const isExpired = decodedToken && decodedToken.exp ?
        decodedToken.exp < Date.now() / 1000  :
        false;

      if (isExpired) {
        console.log('Token expired');
        localStorage.removeItem('token');
        router.navigateByUrl('/');
      }
    } catch (error) {
      console.log('Invalid token');
      localStorage.removeItem('token');
      router.navigateByUrl('/');
    }

  } else {
    console.log('No token');
    router.navigateByUrl('/');
  }

  return next(req);
};
