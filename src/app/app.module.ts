import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';



@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizSelectionComponent,
    QuizResultsComponent,
    DefaultComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule, 
    FormsModule, // For ngModel
    HttpClientModule, // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
