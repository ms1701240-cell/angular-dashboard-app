import { Component,inject,input,OnInit, signal } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { Studentsservices } from '../../core/services/studentsserv.services';
import { Student } from '../../core/Models/students.model';


@Component({
  selector: 'app-studentdetails',
  imports: [RouterLink],
  templateUrl: './studentdetails.html',
  styleUrl: './studentdetails.css',
})
export class Studentdetails implements OnInit {
  id=input<string>('')
  service=inject(Studentsservices);
  student=signal<Student|null>(null);
ngOnInit(): void {
 const studentid=this.id()
  if(studentid){
    const localdata=localStorage.getItem('students');
    if(localdata){
      const studentslist: Student[]=JSON.parse(localdata);
      const founddata=studentslist.find(s=>s.id===Number(studentid))
      if(founddata){
        this.student.set(founddata);
        return;
      }
    }
    this.service.getAll().subscribe((data)=>{
      const foundstudents=data.find(s=>s.id==Number(studentid));
      if(foundstudents){
        this.student.set(foundstudents)
      }
    })
  }
}
}
