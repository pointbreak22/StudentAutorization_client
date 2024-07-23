import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Picture } from '../interfaces/pictures';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPictures = (): Observable<Picture[]> => this.http.get<Picture[]>(`${this.apiUrl}picture`);
  addPicture = (data: Picture) => this.http.post(`${this.apiUrl}picture`, data);
  getPicture = (id: number): Observable<Picture> => this.http.get<Picture>(`${this.apiUrl}picture` + '/' + id);
  deletePicture = (id: number) => this.http.delete(`${this.apiUrl}picture` + '/' + id);
  editPicture = (id: number, data: Picture) => this.http.put(`${this.apiUrl}picture` + '/' + id, data);
}
