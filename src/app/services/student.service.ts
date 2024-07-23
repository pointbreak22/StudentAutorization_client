import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Student } from '../interfaces/students';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getStudents = (): Observable<Student[]> => this.http.get<Student[]>(`${this.apiUrl}student`);
  addStudent = (data: Student) => this.http.post(`${this.apiUrl}student`, data);
  getStudent = (id: number): Observable<Student> => this.http.get<Student>(`${this.apiUrl}student` + '/' + id);
  deleteStudent = (id: number) => this.http.delete(`${this.apiUrl}student` + '/' + id);
  editStudent = (id: number, data: Student) => this.http.put(`${this.apiUrl}student` + '/' + id, data);

}
