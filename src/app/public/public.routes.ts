import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component'; // 👈 thêm dòng này

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent }, // 👈 thêm dòng này
  { path: '**', redirectTo: '/notfound' }
];
