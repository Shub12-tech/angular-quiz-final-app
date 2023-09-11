import { Component } from '@angular/core';
import { QuizQuestion } from '../quiz.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {
  quizParameters!: { category: number; difficulty: string };
  quizQuestions: QuizQuestion[] = [];
  quizLoading: boolean = false;

  constructor(private quizService: QuizService) {} // Inject the QuizService

  loadQuiz(parameters: { category: number; difficulty: string }) {
    this.quizParameters = parameters;
    this.quizLoading = true;
    this.quizService.getQuizQuestions(parameters.category, parameters.difficulty).subscribe((data) => {
      this.quizQuestions = data.results.map((questionData: any) => {
        const options = [...questionData.incorrect_answers, questionData.correct_answer];
        this.quizLoading = false;
        return {
          question: questionData.question,
          options: this.shuffle(options), 
          correctAnswer: questionData.correct_answer
        };
      });
    });

  }

    // Fetch quiz questions based on the parameters
    shuffle(array: any[]) {
      let currentIndex = array.length;
      let randomIndex, tempValue;
  
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
      }
  
      return array;
    }
  }
