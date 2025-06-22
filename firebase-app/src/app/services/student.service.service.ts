import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudent } from '../models/IStudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'https://localhost:44324/api/FireBase'; // ✅ reemplaza por la URL real de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los estudiantes
  getAll(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(this.baseUrl);
  }

  // Obtener un estudiante por ID
  getById(id: string): Observable<IStudent> {
    return this.http.get<IStudent>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un estudiante
  update(id: string, student: IStudent): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, student);
  }

  // Eliminar un estudiante
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Subir un archivo CSV
  uploadCsv(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(this.baseUrl + '/upload-csv', formData, {
  responseType: 'text'
  });
}

  // Obtener estudiantes por filtro
  getByFilter(fieldName: string, fieldValue: string): Observable<IStudent[]> {
    const params = new HttpParams()
      .set('fieldName', fieldName)
      .set('fieldValue', fieldValue);

    return this.http.get<IStudent[]>(`${this.baseUrl}/filter`, { params });
  }
}