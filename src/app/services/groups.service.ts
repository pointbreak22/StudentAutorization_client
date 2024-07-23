import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group } from '../interfaces/group';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/students';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getGroups = (): Observable<Group[]> => this.http.get<Group[]>(`${this.apiUrl}group`);
  addGroup = (data: Group) => this.http.post(`${this.apiUrl}group`, data);
  getGroup = (id: number | undefined): Observable<Group> => this.http.get<Group>(`${this.apiUrl}group` + '/' + id);
  deleteGroup = (id: number) => this.http.delete(`${this.apiUrl}group` + '/' + id);
  editGroup = (id: number, data: Group) => this.http.put(`${this.apiUrl}group` + '/' + id, data);
  getStudents = (id: number): Observable<Student[]> => this.http.get<Student[]>(`${this.apiUrl}group` + '/' + id + "/students");
}
