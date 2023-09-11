import { Component, EventEmitter, Output,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.css']
})
export class QuizSelectionComponent implements OnInit {
  currentIndex = 0;
  selectedCategory: number = 0; // Initialize with an empty string
  selectedDifficulty: string = '';  
  categories: any[] = [];
  categoryAndDifficult: {
    category: number;
    difficult: string;
  } = { category: 0, difficult: "" };

  @Output() quizParameters = new EventEmitter<{ category: number; difficulty: string }>();
  constructor(private http: HttpClient) {}

  ngOnInit() {
  this.http.get('https://opentdb.com/api_category.php').subscribe((data: any) => {
    this.categories = data.trivia_categories;
  });
}

selectQuizParameters(category: number, difficulty: string) {
    const parameters = {
      category: this.selectedCategory,
      difficulty: this.selectedDifficulty,
    };
    this.quizParameters.emit(parameters);
  }
}
