import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Teacher } from '../interfaces/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTeachers = (): Observable<Teacher[]> => this.http.get<Teacher[]>(`${this.apiUrl}teacher`);
  addTeacher = (data: Teacher) => this.http.post(`${this.apiUrl}teacher`, data);
  getTeacher = (id: number): Observable<Teacher> => this.http.get<Teacher>(`${this.apiUrl}teacher` + '/' + id);
  deleteTeacher = (id: number) => this.http.delete(`${this.apiUrl}teacher` + '/' + id);
  editTeacher = (id: number, data: Teacher) => this.http.put(`${this.apiUrl}teacher` + '/' + id, data);
}
