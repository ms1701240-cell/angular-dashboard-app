import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationApplication } from '../Models/regestration.model';
import { enviroment } from '../enviroment/Api';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private http = inject(HttpClient);
  private apiUrl = enviroment.apiurlstudent;

  submitApplication(applicationData: RegistrationApplication): Observable<RegistrationApplication> {
    
    return this.http.post<RegistrationApplication>(`${this.apiUrl}/users`, applicationData);
  }
}