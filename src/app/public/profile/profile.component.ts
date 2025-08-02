import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true, // ✅ đánh dấu là standalone
  imports: [CommonModule, ButtonModule, TagModule, TranslateModule], 
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // user = {
  //   name: 'Nguyễn Đăng Hòa',
  //   nickName: "Kody",
  //   email: 'hoa.nguyen@example.com',
  //   phone: '0123 456 789',
  //   role: 'Administrator',
  //   avatar: 'https://i.pravatar.cc/150?img=3',
  //   address: '123 Đường Lê Lợi, Hà Nội',
  //   joinedAt: new Date('2022-03-15'),
  //   bio: 'Tôi luôn tin rằng công nghệ là chìa khóa để kết nối con người và tạo nên giá trị bền vững.',
  //   aboutMe: 'Xin chào! Tôi là một lập trình viên đam mê với 5 năm kinh nghiệm phát triển web, yêu thích UI đẹp, UX tốt và tư duy hướng người dùng.',
  //   education: [
  //     {
  //       school: 'Đại học Bách Khoa Hà Nội',
  //       degree: 'Kỹ sư Công nghệ Thông tin',
  //       startYear: 2015,
  //       endYear: 2019
  //     },
  //     {
  //       school: 'Đại học FPT',
  //       degree: 'Thạc sĩ Khoa học Máy tính',
  //       startYear: 2020,
  //       endYear: 2022
  //     }
  //   ],
  
  //   workExperience: [
  //     {
  //       company: 'Công ty ABC Tech',
  //       position: 'Lập trình viên Frontend',
  //       startDate: '2019-07',
  //       endDate: '2021-06',
  //       description: 'Phát triển giao diện người dùng với Angular và PrimeNG.'
  //     },
  //     {
  //       company: 'XYZ Solutions',
  //       position: 'Kỹ sư phần mềm Fullstack',
  //       startDate: '2021-07',
  //       endDate: 'Hiện tại',
  //       description: 'Xây dựng hệ thống quản lý tuyển dụng với NestJS và Angular.'
  //     }
  //   ],
  
  //   skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Git'],
  
  //   foreignLanguages: [
  //     {
  //       language: 'English',
  //       level: 'Advanced'
  //     },
  //     {
  //       language: 'Japanese',
  //       level: 'Intermediate'
  //     }
  //   ],
  
  //   projects: [
  //     {
  //       name: 'Hệ thống quản lý CV',
  //       description: 'Ứng dụng giúp người dùng tạo và quản lý hồ sơ xin việc online.',
  //       technologies: ['Angular', 'Node.js', 'MongoDB']
  //     },
  //     {
  //       name: 'Hệ thống chấm công nội bộ',
  //       description: 'Xây dựng ứng dụng chấm công bằng mã QR.',
  //       technologies: ['React', 'Firebase']
  //     }
  //   ],
  
  //   awards: [
  //     {
  //       title: 'Nhân viên xuất sắc tháng 12/2021',
  //       issuer: 'Công ty XYZ Solutions'
  //     },
  //     {
  //       title: 'Giải nhất Hackathon 2020',
  //       issuer: 'Đại học FPT'
  //     }
  //   ]
  // };
  
  // user!: User;
  user: User = {
    username: '',
    nickName: '',
    email: '',
    name: '',
    phone: '',
    role: 'User',
    avatar: '',
    address: '',
    joinedAt: new Date(),
    bio: '',
    aboutMe: '',
    education: [],
    workExperience: [],
    skills: [],
    foreignLanguages: [],
    projects: [],
    awards: [],
  };
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
      const userId = '68845468b2012fdfa67d7418'
      this.userService.getUser(userId).subscribe(data => {
        this.user = data;
      });
  }
}
