// quiz.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from '../quiz.service';
import { QuizQuestion } from '../quiz.model';
import { Router } from '@angular/router'
import {Answer} from '../answer.model';
import { QuizQuestionService } from '../quiz-question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Input() quizParameters!: { category: number; difficulty: string };
  @Input() quizQuestions: QuizQuestion[] = []; 
  selectedOption: number[] = [];
  questionsAnswered = 0;
  currentQuestion = 0;
  userAnswers: string[] = [];
  showSubmitButton = false;
  showResults = false;
  score = 0;
  correctAnswers: Answer[] = [];
  wrongAnswers: Answer[] = [];

  constructor(private quizService: QuizService,private router: Router,private quizQuestionService:QuizQuestionService) {}

  ngOnInit() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    if (this.quizParameters) {
      this.quizService.getQuizQuestions(this.quizParameters.category, this.quizParameters.difficulty)
        .subscribe(
          (data: any) => {
            this.quizQuestions = data.results.map((questionData: any) => {
              const options = [...questionData.incorrect_answers, questionData.correct_answer];
              return {
                question: questionData.question,
                options: this.shuffle(options),
                correctAnswer: questionData.correctAnswer // Randomize options
              };
            });
          },
          (error: any) => {
            console.error('Error fetching quiz questions:', error);
            // Handle the error appropriately
          }
        );
    }
  }
   
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


  selectedAnswer(question: QuizQuestion, selectedOption: string) {
    question.selectedAnswer = selectedOption;
  }

  isAllQuestionsAnswered() {
    return this.questionsAnswered === this.quizQuestions.length;
  }

  submitQuiz() {
    const unansweredQuestions = this.quizQuestions.filter(question => !question.selectedAnswer);
    
    if (unansweredQuestions.length === 0) {
      this.quizQuestionService.saveQuestions(this.quizQuestions);
      this.router.navigate(['/quiz-results']);
    } else {
      alert('Please answer all questions before submitting the quiz.');
    }
  }

  selectAnswer(question: QuizQuestion, answer: string) {
    question.selectedAnswer = answer;
  }

  unattemptedQuestionsExist(): boolean {
    return this.quizQuestions.some(question => !question.selectedAnswer);
  }
}
