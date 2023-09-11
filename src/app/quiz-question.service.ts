import { Injectable } from '@angular/core';
import { QuizQuestion } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionService {

  constructor() { }

  quizQuestions: QuizQuestion[] = [];


  saveQuestions(quizQuestions: QuizQuestion[]) {
    this.quizQuestions = quizQuestions;
  }

  retrieveQuestions() {
    return this.quizQuestions;
  }
}
