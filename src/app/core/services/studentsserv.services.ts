import { Injectable,inject} from '@angular/core';
import { Student } from '../Models/students.model';
import { map, Observable,of } from 'rxjs';
import {enviroment} from '../enviroment/Api'
import { ApiUser } from '../Models/ApiStudentusers';
import { Baseservice } from './baseservice';

@Injectable({
  providedIn: 'root',
})
export class Studentsservices extends Baseservice<Student> {

  constructor() {

    const apiurl=enviroment.apiurlstudent
    super('users', apiurl);
  }
  

 override getAll(): Observable<Student[]> {
    return this.http.get<ApiUser[] >(`${this.apiUrl}/users`).pipe(
      map(response => response.map((user: ApiUser): Student => ({
        id: user.id,
        fullName: `${user.name}`,
        age: 10 + (user.id % 5),
        grade: (user.id % 4 + 1),
        email: user.email,
        phone: user.phone,
        classroom: `class ${String.fromCharCode(65 + (user.id % 4))}`,
        status: 'ACTIVE',
        createdAt: '2026-01-01',
        image: user.image,
         address: `${user.address.city} ${user.address.street||''}`
      })))
    );
  }
  
  
  
}
