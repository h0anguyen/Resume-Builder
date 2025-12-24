import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class AIService {
  constructor(private http: HttpClient) {}

  evaluteProfile(userId: string): Observable<User> {
    return this.http
      .post<ApiResponse<User>>(
        `profile/evaluate/${userId}`,
        { userId }
      )
      .pipe(
        map(res => res.data), // ✅ LẤY USER RA
        catchError(error => {
          console.error('Error during AI evaluation:', error);
          return throwError(() => error);
        })
      );
  }
}
