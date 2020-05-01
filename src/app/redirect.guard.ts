import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate,
  Router
} from '@angular/router';
import { CodeService, CodePriority } from './services/code.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(
    private code: CodeService,
    private router: Router) { }

  // if there is code in # redirect it to scratchpad
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const fragment = route.fragment;

    try {
      if (typeof fragment === 'string' && fragment !== '') {
        const code = atob(fragment);
        this.code.set(code, CodePriority.URL);
        this.router.navigateByUrl('scratchpad');
      }
    } catch (e) { }

    return true;
  }

}
