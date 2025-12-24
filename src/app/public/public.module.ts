import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from '../../../src/app.component';
import { ButtonModule } from 'primeng/button';

// 👉 Thêm component khác tại đây nếu cần

@NgModule({
  declarations: [
    ProfileComponent,
    AppComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    ProfileComponent,
  ]
})
export class PublicModule { }
