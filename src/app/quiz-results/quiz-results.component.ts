import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizQuestionService } from '../quiz-question.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {
  correctAnswers: number = 0;
  totalQuestions: number = 0;
  resultColor: string = '';
  resultScore: string = '';
  quizQuestions: any[] = [];

  constructor(private router: Router, private quizQuestionService: QuizQuestionService) { }


  ngOnInit() {
    this.quizQuestions = this.quizQuestionService.retrieveQuestions();
  }

  calculateScore(): number {
    const correctAnswers = this.quizQuestions.filter(question => question.selectedAnswer === question.correctAnswer);
    return correctAnswers.length;
  }

  getScoreBarStyle() {
    const score = this.calculateScore();

    let barColor: string;
    if (score <= 1) {
      barColor = 'red';
    } else if (score <= 3) {
      barColor = 'yellow';
    } else {
      barColor = 'green';
    }

    return {
      'background-color': barColor
    };
  }


  goToNewQuizCreation() {
    this.router.navigate(['/new-quiz']);
  }

}
