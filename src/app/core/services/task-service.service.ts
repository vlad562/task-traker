import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../features/task/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  updateTask(id: number, changes: Partial<Task>) {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, changes);
  }
  create(data: Task) {
    return this.http.post<Task>(`${this.apiUrl}`, data);
  }
  deleteTask(id: number | string) {
    return this.http.delete<void>(`${`${this.apiUrl}/${id}`}`);
  }
}
