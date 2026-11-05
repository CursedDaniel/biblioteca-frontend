
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Angular proporciona automáticamente una instancia de HttpClient.
  private http = inject(HttpClient);

  // Dirección base de FastAPI.
  private readonly apiUrl = environment.apiUrl.replace(/\/+$/, '');
  private collectionUrl(resource: string): string {
    const cleanResource = resource.replace(/^\/+|\/+$/g, '');

    return `${this.apiUrl}/${cleanResource}/`;
  }

  // Ejemplo: http://127.0.0.1:8000/libros/123
  private itemUrl(resource: string, id: string | number): string {
    const safeId = encodeURIComponent(String(id));

    return `${this.collectionUrl(resource)}${safeId}`;
  }

  //1. GET: obtener todos los registros.
  getAll<T>(resource: string): Observable<T[]> {
    return this.http.get<T[]>(this.collectionUrl(resource));
  }

  //2. GET: obtener un registro por su ID.
  getById<T>(
    resource: string,
    id: string | number
  ): Observable<T> {
    return this.http.get<T>(this.itemUrl(resource, id));
  }

  //3. POST: crear un registro.
  create<T>(
    resource: string,
    data: Partial<T>
  ): Observable<T> {
    return this.http.post<T>(this.collectionUrl(resource), data);
  }

  //4. PUT: actualizar un registro.
  update<T>(
    resource: string,
    id: string | number,
    data: Partial<T>
  ): Observable<T> {
    return this.http.put<T>(this.itemUrl(resource, id), data);
  }

  //5. DELETE: eliminar un registro.
  delete(
    resource: string,
    id: string | number
  ): Observable<void> {
    return this.http.delete<void>(this.itemUrl(resource, id));
  }
}

