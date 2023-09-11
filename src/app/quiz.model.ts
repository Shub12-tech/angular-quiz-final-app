export interface QuizQuestion {
  id: string;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrect_answers: string[];
  answers: string[];
  selectedAnswer?: string;
  options:string;
}

export interface QuizQuestionResponse {
  results: QuizQuestion[];
}
