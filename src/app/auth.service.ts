import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './User';
import {Router} from '@angular/router';
import {retry} from 'rxjs/operators';

/**
 * The Auth Service.
 *
 * Service for authorization.
 *
 * @author Sergi Philipsen
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userURL = 'http://gefeliciflappeltaart.nl:8080/walbert/users/me';
  private permanent: boolean;

  constructor(private http: HttpClient, private router: Router) {
  }

  public getToken() {
    const token: string = localStorage.getItem('authToken');
    return token;
  }

  private setToken(user: User, permanent: boolean = false) {
    this.permanent = permanent;
    return localStorage.setItem('authToken', btoa(`${user.username}:${user.password}`));
  }

  public delToken() {
    return localStorage.removeItem('authToken');
  }

  public isAuthenticated() {
    return !(this.getToken() === null);
  }

  public loginUser(user: User) {
    this.setToken(user, false);
    this.http.get<User>(this.userURL).pipe(retry(4)).subscribe(result => {
      if (user.username === result.username) {
        this.setToken(user, true);
        this.router.navigate(['start']);
      }
    });

    localStorage.removeItem('tempAuthToken');
  }

  public logout() {
    this.delToken();
  }
}
