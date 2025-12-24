import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`users/${id}`).pipe(
      tap((data) => {
        console.log('User data:', data);
      }),
      catchError((error) => {
        console.error('Error fetching user:', error);
        throw error;
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('users');
  }

  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`users/${id}`, userData);
  }
}
