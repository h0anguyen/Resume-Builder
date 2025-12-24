export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  skill: string;
  description: string;
  level: string; 
};

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

export interface AIEvaluate {
  total_score: number;
  section_scores: {
    education: number;
    experience: number;
    skills: number;
    projects: number;
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  ats_readiness: string;
  update_time: string;
}
export interface User {
  _id?: string;
  username: string;
  nickName?: string;
  email: string;
  password?: string;
  name?: string;
  phone?: string;
  role?: string; // vị trí ứng tuyển
  level?: string;
  avatar?: string;
  address?: string;
  joinedAt?: Date;
  bio?: string;
  aboutMe?: string;
  education?: Education[];
  workExperience?: WorkExperience[];
  skills?: Skill[];
  foreignLanguages?: ForeignLanguage[];
  projects?: Project[];
  awards?: Award[];
  AIEvaluate?: AIEvaluate;
  createdAt?: Date;
  updatedAt?: Date;
}
