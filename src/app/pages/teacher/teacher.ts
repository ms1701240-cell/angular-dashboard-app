import { Component, computed, OnInit } from '@angular/core';
import{inject} from '@angular/core';
import { Teacherserv } from '../../core/services/teacherserv';
import { TeacherModel } from '../../core/Models/teacher.model';
import { signal } from '@angular/core';
import { Tableshared } from '../../components/tableshared/tableshared';
import { Paginationshared } from '../../components/paginationshared/paginationshared';
import { FormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Modalshared } from '../../components/modalshared/modalshared';
import { Datanotification } from '../../core/services/datanotification';

@Component({
  selector: 'app-teacher',
  imports: [Tableshared, Paginationshared, FormsModule, RouterLink,ReactiveFormsModule,Modalshared],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css',
})
export class Teacher implements OnInit {
  services=inject(Teacherserv)
  teacher=signal<TeacherModel[]>([])
   searchinput=signal<string>('');
   currentpage=signal<number>(1);
   itemperpage=10;
    modeltitle=signal<string>('AddTeacher')

  filterteacher=computed(()=>{
     const term=this.searchinput();
     const list=this.teacher();
     const filtred=list.filter((teach)=>{
      const filtersearch=teach.fullName.toLowerCase().includes(term.toLowerCase())|| teach.email.toLowerCase().includes(term.toLowerCase());
      return filtersearch
     })
       const start=(this.currentpage()-1)*this.itemperpage
       return filtred.slice(start,start+this.itemperpage)
  })
     ismodelopen=signal<boolean>(false)
      fb=inject(FormBuilder)
      message=signal<string>('')
      notificationbell=inject(Datanotification)
    teacherforms:FormGroup=this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]], 
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(11)]],
    address: ['', [Validators.required]]
   });
   onsubmit(){
    if(this.teacherforms.valid){
      const formdata=this.teacherforms.value;
      if(this.editingid()){
        const id=this.editingid();
        this.services.update(id,formdata).subscribe({
          next:()=>{
 this.teacher.update((list)=>{
          const neweditlist=list.map((t=>t.id===this.editingid()?{...t,...this.teacherforms.value}:t));
          localStorage.setItem('teacher',JSON.stringify(neweditlist));
          return neweditlist
        });
        this.message.set('تم التعديل بنجاح');
        setTimeout(()=>this.message.set(''),2000);

        this.notificationbell.addnotification('Teacher update profile',`تم تحديث بيانات المعلم ${this.teacherforms.value.fullName} بنجاح`)
        this.closemodel();
          },
          error:()=>{
            this.message.set('حدث خطأ اثناء تعديل بيانات المعلم');
            setTimeout(()=>this.message.set(''),2000);
          }
        })
      }else{
        this.services.create(formdata).subscribe({
          next:(res)=>{
 const newteacher={...res,
  status: 'Active', 
  createdAt: new Date().toLocaleDateString(),       
  image: 'https://via.placeholder.com/150'};
      this.teacher.update((list)=>{
        const newtech=[...list,newteacher];
        localStorage.setItem('teacher',JSON.stringify(newtech))
        return newtech
      })
      this.message.set('تمت الاضافه بنجاح');
      setTimeout(()=>this.message.set(''),2000);
      this.notificationbell.addnotification('Teacher added Profile', 
  `تم اضافه بيانات المعلم ${this.teacherforms.value.fullName} بنجاح`)
      this.closemodel()
          },
          error:()=>{
            this.message.set('حدث خطأ اثناء اضافه بيانات المعلم');
            setTimeout(()=>this.message.set(''),2000);
          }
        })
      }
    }else{
      this.teacherforms.markAllAsTouched();
    }
   }

   closemodel(){
    this.ismodelopen.set(false);
     this.editingid.set(null);
    this.teacherforms.reset();
   
   }
   editingid=signal<number|null>(null)
     editteacher(teachers:TeacherModel){
      this.editingid.set(teachers.id);
      this.teacherforms.patchValue(teachers);
      this.ismodelopen.set(true)
     }
      
      deleteteacher(id:number){
        this.services.delete(id).subscribe({
          next:()=>{
this.teacher.update((lists)=>{
        const updatelist=lists.filter(s=>s.id!=id);
        localStorage.setItem('teacher',JSON.stringify(updatelist))
        return updatelist
      })
      this.message.set('تم حذف الطالب ')
      setTimeout(() => this.message.set(''), 2000);
      this.notificationbell.addnotification('Teacher Deleted', 'تم حذف المعلم من النظام');
          },
          error:()=>{
            this.message.set('حدث خطأ اثناء حذف بيانات المعلم');
            setTimeout(()=>this.message.set(''),2000);
          }
        })
    }
haserror=signal<boolean>(false)
ngOnInit(): void {
  this.LoadData();
}
LoadData(){
  
  this.haserror.set(false);
  
  
    const savedData = localStorage.getItem('teacher');
    if (savedData) {
      
      this.teacher.set(JSON.parse(savedData));
      
    } else {
      
      this.services.getAll().subscribe({
        next: (res) => {
          this.teacher.set(res);
          localStorage.setItem('teacher', JSON.stringify(res)); 
        
        },
        error: () => {
      
          this.haserror.set(true);
        }
      });
    }
  
}
}

