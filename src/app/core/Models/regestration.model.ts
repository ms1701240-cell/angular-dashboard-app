export interface StudentInfo {
  fullName: string;
  dateOfBirth: string;
  grade: number;
  gender: string;
  
}

export interface ParentInfo {
  parentName: string;
  phone: string;
  email: string;
  adrees: string;
  relationship: string;
}

export interface MedicalInfo {
  bloodType: string;
  emergencyContact: string;
  medicalnotes: string;
  alleriges: string;
}

export interface DocumentsInfo {
  studentPhoto: File ;
  BirthCertificate: File;
  parentid: File;
}

export interface RegistrationApplication {
  student: StudentInfo;
  Parent: ParentInfo;
  medical: MedicalInfo;
  documents: DocumentsInfo;
}