import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true, // ✅ đánh dấu là standalone
  imports: [CommonModule], // ✅ import CommonModule để dùng *ngIf
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = '687fab5e4200cba76a3307fc'
    this.userService.getUser(userId).subscribe(data => {
      this.user = data;
    });
  }
}
