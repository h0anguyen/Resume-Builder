import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-profile',
  standalone: true, // ✅ đánh dấu là standalone
  imports: [CommonModule, ButtonModule, TagModule], // ✅ import CommonModule để dùng *ngIf
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'Hòa Nguyễn',
    email: 'hoa.nguyen@example.com',
    phone: '0123 456 789',
    role: 'Administrator',
    avatar: 'https://i.pravatar.cc/150?img=3',
    address: '123 Đường Lê Lợi, Hà Nội',
    joinedAt: new Date('2022-03-15'),
    bio: 'Tôi luôn tin rằng công nghệ là chìa khóa để kết nối con người và tạo nên giá trị bền vững.'
  };
  // user!: User;

  // constructor(private userService: UserService) {}

  ngOnInit(): void {
    //   const userId = '687fab5e4200cba76a3307fc'
    //   this.userService.getUser(userId).subscribe(data => {
    //     this.user = data;
    //   });
  }
}
