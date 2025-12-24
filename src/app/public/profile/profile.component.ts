import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AIService } from '../../services/AI.service';
import { User, Education, WorkExperience, ForeignLanguage, Project, Award, AIEvaluate, Skill } from '../../models/user.model';
import { import_modules } from '../import-modules';
import cloneDeep from 'lodash/cloneDeep';
import { NotifyService } from '../ui-component/notifyService';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [...import_modules],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = {
    username: '',
    nickName: '',
    email: '',
    name: '',
    phone: '',
    role: '',
    level: '',
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
    AIEvaluate: {
      total_score: 0,
      section_scores: {
        education: 0,
        experience: 0,
        skills: 0,
        projects: 0,
      },
      strengths: [],
      weaknesses: [],
      suggestions: [],
      ats_readiness: '',
      update_time: ''
    }
  };

  dataUpdate: Partial<User> = {};

  displayProfile = false;
  breakpointsProfile = { '960px': '75vw' };
  styles = { width: '50vw' };
  loading = false;

  // Collapse/Expand states
  expandedSections = {
    aboutMe: false,
    education: false,
    workExperience: false,
    skills: false,
    languages: false,
    projects: false,
    awards: false
  };

  // Dropdown options
  skillLevels: any[] = [];
  languageLevels: any[] = [];

  constructor(
    private userService: UserService,
    private aiService: AIService,
    private notify: NotifyService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    const userId = '68845468b2012fdfa67d7418';
    this.getInfoUser(userId);
    this.initializeDropdowns();
  }

  initializeDropdowns(): void {
    // Initialize skill levels
    this.skillLevels = [
      { label: this.translate.instant('SKILL_LEVEL.BEGINNER'), value: 'Beginner' },
      { label: this.translate.instant('SKILL_LEVEL.INTERMEDIATE'), value: 'Intermediate' },
      { label: this.translate.instant('SKILL_LEVEL.ADVANCED'), value: 'Advanced' },
      { label: this.translate.instant('SKILL_LEVEL.EXPERT'), value: 'Expert' }
    ];

    // Initialize language levels
    this.languageLevels = [
      { label: `A1 - ${this.translate.instant('LANGUAGE_LEVEL.A1')}`, value: 'A1' },
      { label: `A2 - ${this.translate.instant('LANGUAGE_LEVEL.A2')}`, value: 'A2' },
      { label: `B1 - ${this.translate.instant('LANGUAGE_LEVEL.B1')}`, value: 'B1' },
      { label: `B2 - ${this.translate.instant('LANGUAGE_LEVEL.B2')}`, value: 'B2' },
      { label: `C1 - ${this.translate.instant('LANGUAGE_LEVEL.C1')}`, value: 'C1' },
      { label: `C2 - ${this.translate.instant('LANGUAGE_LEVEL.C2')}`, value: 'C2' },
      { label: this.translate.instant('LANGUAGE_LEVEL.NATIVE'), value: 'Native' }
    ];

    // Subscribe to language change to update dropdowns
    this.translate.onLangChange.subscribe(() => {
      this.initializeDropdowns();
    });
  }

  getInfoUser(userId: string): void {
    this.userService.getUser(userId).subscribe(data => {
      this.user = data;
    });
  }

  openModalEditProfile(): void {
    this.dataUpdate = cloneDeep(this.user);
    
    // Initialize arrays if they don't exist
    if (!this.dataUpdate.education) this.dataUpdate.education = [];
    if (!this.dataUpdate.workExperience) this.dataUpdate.workExperience = [];
    if (!this.dataUpdate.skills) this.dataUpdate.skills = [];
    if (!this.dataUpdate.foreignLanguages) this.dataUpdate.foreignLanguages = [];
    if (!this.dataUpdate.projects) this.dataUpdate.projects = [];
    if (!this.dataUpdate.awards) this.dataUpdate.awards = [];

    // Convert year numbers to Date objects for DatePicker
    if (this.dataUpdate.education) {
      this.dataUpdate.education = this.dataUpdate.education.map((edu: any) => ({
        ...edu,
        startYear: edu.startYear ? new Date(edu.startYear, 0, 1) : null,
        endYear: edu.endYear ? new Date(edu.endYear, 0, 1) : null
      }));
    }

    // Convert date strings to Date objects for DatePicker (MM/YYYY format)
    if (this.dataUpdate.workExperience) {
      this.dataUpdate.workExperience = this.dataUpdate.workExperience.map((work: any) => ({
        ...work,
        startDate: work.startDate ? this.parseMonthYear(work.startDate) : null,
        endDate: work.endDate ? this.parseMonthYear(work.endDate) : null
      }));
    }
    
    this.displayProfile = true;
  }

  parseMonthYear(dateString: string): Date | null {
    if (!dateString || dateString === 'Hiện tại') return null;
    const parts = dateString.split('/');
    if (parts.length === 2) {
      const month = parseInt(parts[0]) - 1; // Month is 0-indexed
      const year = parseInt(parts[1]);
      return new Date(year, month, 1);
    }
    return null;
  }

  closeModalEditProfile(): void {
    this.displayProfile = false;
    this.dataUpdate = {};
  }

  saveModalEditProfile(): void {
    // Validate required fields
    if (!this.dataUpdate.name || !this.dataUpdate.email) {
      this.notify.showError({ 
        summary: this.translate.instant('NOTIFY.ERROR'), 
        detail: 'Vui lòng điền đầy đủ thông tin bắt buộc' 
      });
      return;
    }

    // Convert Date objects to proper format before saving
    const dataToSave = this.prepareDataForSave(this.dataUpdate);

    this.userService.updateUser(this.user._id!, dataToSave).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.displayProfile = false;
        this.notify.showSuccess({ 
          summary: this.translate.instant('NOTIFY.SUCCESS'), 
          detail: this.translate.instant('NOTIFY.UPDATE_SUCCESS') 
        });
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.notify.showError({ 
          summary: this.translate.instant('NOTIFY.ERROR'), 
          detail: this.translate.instant('NOTIFY.UPDATE_FAIL') 
        });
      }
    });
  }

  prepareDataForSave(data: any): any {
    const preparedData = cloneDeep(data);

    // Convert education dates
    if (preparedData.education) {
      preparedData.education = preparedData.education.map((edu: any) => ({
        ...edu,
        startYear: edu.startYear instanceof Date ? edu.startYear.getFullYear() : edu.startYear,
        endYear: edu.endYear instanceof Date ? edu.endYear.getFullYear() : edu.endYear
      }));
    }

    // Convert work experience dates to string format (MM/YYYY)
    if (preparedData.workExperience) {
      preparedData.workExperience = preparedData.workExperience.map((work: any) => ({
        ...work,
        startDate: work.startDate instanceof Date 
          ? `${(work.startDate.getMonth() + 1).toString().padStart(2, '0')}/${work.startDate.getFullYear()}`
          : work.startDate,
        endDate: work.endDate instanceof Date 
          ? `${(work.endDate.getMonth() + 1).toString().padStart(2, '0')}/${work.endDate.getFullYear()}`
          : work.endDate
      }));
    }

    return preparedData;
  }

  evaluateProfile(): void {
    this.loading = true;
    this.aiService.evaluteProfile(this.user._id!).subscribe({
      next: (res) => {
        this.user = res;
        this.loading = false;
        this.notify.showSuccess({ 
          summary: this.translate.instant('NOTIFY.SUCCESS'), 
          detail: this.translate.instant('NOTIFY.EVALUATE_SUCCESS') 
        });
      },
      error: (error) => {
        console.error('Error evaluating profile:', error);
        this.loading = false;
        this.notify.showError({ 
          summary: this.translate.instant('NOTIFY.ERROR'), 
          detail: this.translate.instant('NOTIFY.EVALUATE_FAIL') 
        });
      }
    });
  }

  // ========== EDUCATION METHODS ==========
  addEducation(): void {
    if (!this.dataUpdate.education) {
      this.dataUpdate.education = [];
    }
    this.dataUpdate.education.push({
      degree: '',
      school: '',
      startDate: '',
      endDate: ''
    });
  }

  removeEducation(index: number): void {
    if (this.dataUpdate.education) {
      this.dataUpdate.education.splice(index, 1);
    }
  }

  // ========== WORK EXPERIENCE METHODS ==========
  addWorkExperience(): void {
    if (!this.dataUpdate.workExperience) {
      this.dataUpdate.workExperience = [];
    }
    this.dataUpdate.workExperience.push({
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  }

  removeWorkExperience(index: number): void {
    if (this.dataUpdate.workExperience) {
      this.dataUpdate.workExperience.splice(index, 1);
    }
  }

  // ========== SKILLS METHODS ==========
  addSkill(): void {
    if (!this.dataUpdate.skills) {
      this.dataUpdate.skills = [];
    }
    this.dataUpdate.skills.push({
      skill: '',
      level: '',
      description: ''
    });
  }

  removeSkill(index: number): void {
    if (this.dataUpdate.skills) {
      this.dataUpdate.skills.splice(index, 1);
    }
  }

  // ========== FOREIGN LANGUAGE METHODS ==========
  addLanguage(): void {
    if (!this.dataUpdate.foreignLanguages) {
      this.dataUpdate.foreignLanguages = [];
    }
    this.dataUpdate.foreignLanguages.push({
      language: '',
      level: ''
    });
  }

  removeLanguage(index: number): void {
    if (this.dataUpdate.foreignLanguages) {
      this.dataUpdate.foreignLanguages.splice(index, 1);
    }
  }

  // ========== PROJECT METHODS ==========
  addProject(): void {
    if (!this.dataUpdate.projects) {
      this.dataUpdate.projects = [];
    }
    this.dataUpdate.projects.push({
      name: '',
      description: '',
      technologies: []
    });
  }

  removeProject(index: number): void {
    if (this.dataUpdate.projects) {
      this.dataUpdate.projects.splice(index, 1);
    }
  }

  // ========== AWARD METHODS ==========
  addAward(): void {
    if (!this.dataUpdate.awards) {
      this.dataUpdate.awards = [];
    }
    this.dataUpdate.awards.push({
      title: '',
      issuer: ''
    });
  }

  removeAward(index: number): void {
    if (this.dataUpdate.awards) {
      this.dataUpdate.awards.splice(index, 1);
    }
  }

  // ========== TOGGLE SECTION ==========
  toggleSection(section: keyof typeof this.expandedSections): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }
}