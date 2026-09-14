import { Injectable } from '@angular/core';
import { TeacherModel } from '../Models/teacher.model';
import { enviroment } from '../enviroment/Api';
import { Baseservice } from './baseservice';
import { Observable } from 'rxjs';
import { ApiUser } from '../Models/ApiTeachers';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Teacherserv extends Baseservice<TeacherModel> {
 
   constructor() {
    const apiurl=enviroment.apiurlteacher
    super('users', apiurl);
  }
 override getAll(): Observable<TeacherModel[]> {
    return this.http.get<ApiUser[]>(`${this.apiUrl}/users`).pipe(
      map(response => response.map((user): TeacherModel => ({
        id: user.id,
        fullName: user.name, 
        email: user.email,
        phone: user.phone,
        subject: 'General', 
        image: user.image || 'https://via.placeholder.com/150',
        address: `${user.address.city} - ${user.address.street}` 
      })))
    );
  }
  
}
