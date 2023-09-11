import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }



  getQuizQuestions(category: number, difficulty: string): Observable<any> {
    const url = `${this.apiUrl}?amount=5&category=${category}&difficulty=${difficulty}`;
    return this.http.get(url);
  }
}