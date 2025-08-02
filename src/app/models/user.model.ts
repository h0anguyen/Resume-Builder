export interface Education {
  school: string;
  degree: string;
  startYear: number;
  endYear: number;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ForeignLanguage {
  language: string;
  level: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
}

export interface Award {
  title: string;
  issuer: string;
}

export interface User {
  _id?: string;
  username: string;
  nickName?: string;
  email: string;
  password?: string;
  name?: string;
  phone?: string;
  role?: 'User' | 'Administrator' | 'Moderator';
  avatar?: string;
  address?: string;
  joinedAt?: Date;
  bio?: string;
  aboutMe?: string;
  education?: Education[];
  workExperience?: WorkExperience[];
  skills?: string[];
  foreignLanguages?: ForeignLanguage[];
  projects?: Project[];
  awards?: Award[];
  createdAt?: Date;
  updatedAt?: Date;
}
