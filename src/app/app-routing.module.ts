import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';

const routes: Routes = [
  { path: 'quiz-results', component: QuizResultsComponent },
  { path: 'new-quiz', component: DefaultComponent },
  { path: '', redirectTo: 'new-quiz', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
