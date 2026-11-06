import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiListResponse, ApiResponse } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class CrudService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private collectionUrl(resource: string): string {
    return `${this.apiUrl}/${resource.replace(/^\/+|\/+$/g, '')}/`;
  }

  private itemUrl(resource: string, id: string): string {
    return `${this.collectionUrl(resource)}${encodeURIComponent(id)}`;
  }

  getAll<T>(resource: string): Observable<T[]> {
    return this.http
      .get<ApiListResponse<T>>(this.collectionUrl(resource))
      .pipe(map(r => r.data));
  }

  getById<T>(resource: string, id: string): Observable<T> {
    return this.http
      .get<ApiResponse<T>>(this.itemUrl(resource, id))
      .pipe(map(r => r.data));
  }

  create<T>(resource: string, body: unknown): Observable<T> {
    return this.http
      .post<ApiResponse<T>>(this.collectionUrl(resource), body)
      .pipe(map(r => r.data));
  }

  update<T>(resource: string, id: string, body: unknown): Observable<T> {
    return this.http
      .put<ApiResponse<T>>(this.itemUrl(resource, id), body)
      .pipe(map(r => r.data));
  }

  delete(resource: string, id: string): Observable<unknown> {
    return this.http.delete(this.itemUrl(resource, id));
  }
}