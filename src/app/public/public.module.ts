import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from '../../../src/app.component';

// 👉 Thêm component khác tại đây nếu cần

@NgModule({
  declarations: [
    ProfileComponent,
    AppComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProfileComponent,
  ]
})
export class PublicModule { }
