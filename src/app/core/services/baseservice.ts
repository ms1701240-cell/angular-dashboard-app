import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Baseservice<T> {
  protected http = inject(HttpClient);
  constructor(protected endpoint: string, protected apiUrl: string) {}
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.endpoint}`);
  }

  create(item:T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${this.endpoint}`, item);
  }

  update(id: number|null, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${this.endpoint}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }
}
