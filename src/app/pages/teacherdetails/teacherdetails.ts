import { Component } from '@angular/core';
import {input,inject,signal,OnInit}from '@angular/core'
import { Teacherserv } from '../../core/services/teacherserv';
import { TeacherModel } from '../../core/Models/teacher.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-teacherdetails',
  imports: [RouterLink],
  templateUrl: './teacherdetails.html',
  styleUrl: './teacherdetails.css',
})
export class Teacherdetails implements OnInit {

service=inject(Teacherserv);
id=input<string>('');
teacher=signal<TeacherModel|null>(null);
ngOnInit(): void {
  const teacherid=this.id();
  if(teacherid){
    const localdata=localStorage.getItem('teacher');
    if(localdata){
      const teacherlist:TeacherModel[]=JSON.parse(localdata);
      const founddata=teacherlist.find(s=>s.id===Number(teacherid))
      if(founddata){
        this.teacher.set(founddata);
        return;
      }
    }
    this.service.getAll().subscribe((data)=>{
      const foundteacher=data.find(s=>s.id===Number(teacherid))
      if(foundteacher){
        this.teacher.set(foundteacher);
      }
    })
  }
}
}
