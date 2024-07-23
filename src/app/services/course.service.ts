import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCourses = (): Observable<Course[]> => this.http.get<Course[]>(`${this.apiUrl}course`);
  addCourse = (data: Course) => this.http.post(`${this.apiUrl}course`, data);
  getCourse = (id: number): Observable<Course> => this.http.get<Course>(`${this.apiUrl}course` + '/' + id);
  deleteCourse = (id: number) => this.http.delete(`${this.apiUrl}course` + '/' + id);
  editCourse = (id: number, data: Course) => this.http.put(`${this.apiUrl}course` + '/' + id, data);
}
