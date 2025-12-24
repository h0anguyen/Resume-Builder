import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, RouterOutlet], // 👈 PHẢI import RouterOutlet để hiển thị route
  template: `<router-outlet></router-outlet>`, // 👈 Quan trọng
})
export class AppComponent {}
