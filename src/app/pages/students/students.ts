import { Component, computed, OnInit, signal } from '@angular/core';
import { Studentsservices } from '../../core/services/studentsserv.services';
import { inject } from '@angular/core';
import { Student } from '../../core/Models/students.model';
import { FormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Tableshared } from '../../components/tableshared/tableshared';
import { Paginationshared } from '../../components/paginationshared/paginationshared';
import { Modalshared } from '../../components/modalshared/modalshared';
import { Datanotification } from '../../core/services/datanotification';

@Component({
  selector: 'app-students',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, Tableshared, Paginationshared, Modalshared],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {
  service = inject(Studentsservices);

  students = signal<Student[]>([]);
  searchterm = signal<string>('');
  selectoption = signal<string>('');
  modeltitle = signal<string>('Add Student Data');

  SortDate(field: keyof Student) {
    this.students.update((list) => {
      if (list.length === 0) return list;
      const newlist = [...list];
      const currentlyasending = newlist[0][field] < newlist[newlist.length - 1][field];
      const sorted = newlist.sort((a, b) => {
        let comaprison = 0;
        if (a[field] < b[field]) comaprison = -1;
        else if (a[field] > b[field]) comaprison = 1;

        return currentlyasending ? -comaprison : comaprison;
      });
      localStorage.setItem('students', JSON.stringify(sorted));
      return sorted;
    });
  }

  currentpage = signal<number>(1);
  itemperpage = 10;

  filteredstudents = computed(() => {
    const term = this.searchterm();
    const lists = this.students();
    const selectedGrade = this.selectoption();
    
    const filtered = lists.filter((student) => {
      const matchesSearch = student.fullName.toLowerCase().includes(term.toLowerCase()) || student.email.toLowerCase().includes(term.toLowerCase());
      const matchesGrade = selectedGrade === '' || student.grade === Number(selectedGrade);
      return matchesSearch && matchesGrade;
    });
    const start = (this.currentpage() - 1) * this.itemperpage;
    return filtered.slice(start, start + this.itemperpage);
  });

  fb = inject(FormBuilder);
  message = signal<string>('');
  ismodalopen = signal<boolean>(false);
  
  studentforms: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]], 
    email: ['', [Validators.required, Validators.email]],
    grade: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(11)]],
    age: ['', [Validators.required, Validators.min(5)]],
    classroom: ['', [Validators.required,Validators.maxLength(2),Validators.pattern(/^[1-4][a-d]$/)]],
    address: ['', [Validators.required]]
  });

  notify = inject(Datanotification);

 onsubmit() {
    if (this.studentforms.valid) {
      const formdata = this.studentforms.value;
      
      if (this.editid()) {
        // --- 1. حالة التعديل (Edit) ---
        const id = this.editid()!;
        this.students.update((list) => {
          const newList = list.map(s => s.id === id ? { ...s, ...formdata } : s);
          localStorage.setItem('students', JSON.stringify(newList));
          return newList;
        });
        
        this.message.set('edit success');
        setTimeout(() => this.message.set(''), 2000);
        this.notify.addnotification('Student Updated Profile', `تم تحديث بيانات الطالب ${formdata.fullName} بنجاح`);
        this.closemodel();

        // (اختياري) لو حابب تبعت للـ API في الخلفية من غير ما يعطل الحفظ المحلي
        this.service.update(id, formdata).subscribe({
          error: (err) => console.log("API Fake Error Ignored:", err)
        });

      } else {
        // --- 2. حالة الإضافة (Create) ---
        this.service.create(formdata).subscribe({
          next: (responsestudent) => {
            const newstudent = {
              ...responsestudent,
              status: 'Active', 
              createdAt: new Date().toLocaleDateString(),      
              image: 'https://picsum.photos/150'
            };

            this.students.update(list => {
              const newList = [...list, newstudent];
              localStorage.setItem('students', JSON.stringify(newList));
              return newList;
            });
            
            this.message.set('add student sucess');
            setTimeout(() => this.message.set(''), 2000);
            this.notify.addnotification('Student added', `تم اضافه بيانات الطالب ${formdata.fullName} بنجاح`);
            this.closemodel();
          },
          error: (err) => {
            console.log("API Error Details:", err);
            this.message.set('add student failed');
            setTimeout(() => this.message.set(''), 2000);
          }
        });
      }

    } else {
      this.studentforms.markAllAsTouched();
    }
  }
  closemodel() {
    this.ismodalopen.set(false);
    this.editid.set(null);
    this.studentforms.reset();
  }
    
  editid = signal<number | null>(null);

  editstudent(student: Student) {
    this.editid.set(student.id);
    this.studentforms.patchValue(student);
    this.ismodalopen.set(true);
  }

  deletestudent(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.students.update((list) => {
          const newList = list.filter(student => student.id !== id);
          localStorage.setItem('students', JSON.stringify(newList));
          return newList;
        });
        this.message.set('تم حذف الطالب بنجاح');
        setTimeout(() => this.message.set(''), 2000);
        this.notify.addnotification('Student Deleted', 'تم حذف طالب من النظام');
      },
      error: (err) => {
        this.message.set('فشل حذف الطالب');
        setTimeout(() => this.message.set(''), 2000);
      }
    });
  }

  haserror = signal<boolean>(false);

  ngOnInit(): void {
    this.LoadData();
  }

  LoadData() {
    this.haserror.set(false);
    
    const localData = localStorage.getItem('students');
    if (localData) {
      this.students.set(JSON.parse(localData));
    } else {
      this.service.getAll().subscribe({
        next: (res) => {
          this.students.set(res);
          localStorage.setItem('students', JSON.stringify(res));
        },
        error: () => {
          this.haserror.set(true);
        }
      });
    }
  }
}