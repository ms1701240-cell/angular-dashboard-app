import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Prograssbar } from '../../components/prograssbar/prograssbar';
import { ParentInfo } from '../../components/parent.info/parent.info';
import { StudentInfo } from '../../components/student-info/student-info';
import { MedicalInfo } from '../../components/medical.info/medical.info';
import { Documents } from '../../components/documents/documents';
import { Review } from '../../components/review/review';
import { RegistrationApplication } from '../../core/Models/regestration.model';
import { Loadingservice } from '../../core/services/loadingservice';
import { Router } from '@angular/router';
import { Student } from '../../core/Models/students.model';
import { Datanotification } from '../../core/services/datanotification';

import { RegistrationService } from '../../core/services/regestrationserv';

@Component({
  selector: 'app-regist',
  imports: [ReactiveFormsModule, Prograssbar, ParentInfo, StudentInfo, MedicalInfo, Documents, Review],
  templateUrl: './regist.html',
  styleUrl: './regist.css',
})
export class Regist {
  
  registrationService = inject(RegistrationService);
  notification=inject(Datanotification);
  isloading = inject(Loadingservice);
  router = inject(Router);
  fb = inject(FormBuilder);

  currentstep = signal<number>(1);
  showerror = signal<boolean>(false);
   sucessmessage=signal<boolean>(false)
  registerationform: FormGroup = this.fb.group({
    student: this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(12)]],
      dateOfBirth: ['', Validators.required],
      grade: ['', Validators.required],
      gender: ['', Validators.required],
      
    }),
    Parent: this.fb.group({
      parentName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(11)]], 
      email: ['', [Validators.required, Validators.email]],        
      adrees: ['', Validators.required],
      relationship: ['', Validators.required]
    }),
    medical: this.fb.group({
      bloodType: ['', Validators.required],
      emergencyContact: ['', Validators.required],
      medicalnotes: ['', Validators.required],
      alleriges: ['', Validators.required]
    }),
    documents: this.fb.group({
      studentPhoto: [null, Validators.required],
      BirthCertificate: [null, Validators.required],
      parentid: [null, Validators.required]
    })
  });

  NextStep() {
    const stepkey = ['student', 'Parent', 'medical', 'documents'];
    const currentstepKey = stepkey[this.currentstep() - 1];
    const registform = this.registerationform.get(currentstepKey);
    
    if (registform?.valid) {
      if (this.currentstep() < 5) {
        this.currentstep.update(current => current + 1);
        this.showerror.set(false);
      }
    } else {
      registform?.markAllAsTouched();
      this.showerror.set(true);
    }
  }

  PrevStep() {
    if (this.currentstep() > 1) {
      this.currentstep.update(current => current - 1);
      this.showerror.set(false);
    }
  }

  oneditstep(stepsnum: number) {
    this.currentstep.set(stepsnum);
    this.showerror.set(false);
  }

  onsubmit() {
    if (this.registerationform.valid) {
      this.isloading.show();
      const formData: RegistrationApplication = this.registerationform.value;

      const birthDate=new Date(formData.student.dateOfBirth);
      const today=new Date();
      let calculateage=today.getFullYear()-birthDate.getFullYear();
      const m=today.getMonth()-birthDate.getMonth();
      if(m<0||m===0&&today.getDate()-birthDate.getDate()<0){
        calculateage--;
      }
      this.registrationService.submitApplication(formData).subscribe({
        next: (response: RegistrationApplication) => {
          
          
          const newStudentForTable: Student = {
            id: Date.now(),
            fullName: formData.student.fullName,
            email: formData.Parent.email,
            phone: formData.Parent.phone,
            address: formData.Parent.adrees,
            grade: formData.student.grade, 
            age: calculateage,
            classroom: `{class${formData.student.grade}A`,
            status: 'Active',
            createdAt: new Date().toLocaleDateString(),
            image: 'https://picsum.photos/150'
          };

         const oldliststring= localStorage.getItem('students')
         const olddata:Student[]=oldliststring?JSON.parse(oldliststring):[];

          const updatelist:Student[]=[newStudentForTable,...olddata]
         localStorage.setItem('students', JSON.stringify(updatelist));

          this.registerationform.reset();
          this.notification.addnotification(`${formData.student.fullName}`,'تم اضافه الطالب')
           this.sucessmessage.set(true)
          setTimeout(() => {
            this.isloading.hide();
           this.sucessmessage.set(false);
            this.router.navigate(['/students']); 
          }, 1000);
        },
        error: (err: HttpErrorResponse) => {
          this.isloading.hide();
         
          alert('حدث خطأ أثناء التسجيل');
        }
      });
    } else {
      this.registerationform.markAllAsTouched();
      this.showerror.set(true);
    }
  }
}