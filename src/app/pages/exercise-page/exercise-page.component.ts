import { Component, OnInit } from '@angular/core';
import { ChapterDetail } from '../../models/dto/chapter/chapter.dto';
import { Question } from '../../models/dto/question/question.dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-page',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './exercise-page.component.html',
  styleUrl: './exercise-page.component.scss'
})
export class ExercisePageComponent implements OnInit {
  // Estado do capítulo e da questão
  chapter: ChapterDetail | null = null;
  currentQuestion: Question | null = null;
  parsedContent: any = null;

  // Estado do progresso
  currentQuestionIndex = 0;
  correctAnswersCount = 0;
  isCompleted = false;

  // Estado da interface
  userAnswer = '';
  feedback: 'correct' | 'incorrect' | 'none' = 'none';
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.startExercise();
  }

  startExercise(): void {
    this.isLoading = true;
    this.error = null;
    const chapterId = this.route.snapshot.paramMap.get('chapterId');
    if (chapterId) {
      this.exerciseService.getChapterDetails(+chapterId).subscribe({
        next: (data) => {
          this.chapter = data;
          this.restartExercise(); // Inicia ou reinicia o exercício
          this.isLoading = false;
        },
        error: (err) => {
          this.error = "Failed to load the exercise.";
          this.isLoading = false;
        }
      });
    }
  }

  loadQuestion(): void {
    if (this.chapter && this.chapter.questions.length > this.currentQuestionIndex) {
      this.currentQuestion = this.chapter.questions[this.currentQuestionIndex];
      this.parsedContent = JSON.parse(this.currentQuestion.content);
      this.userAnswer = '';
      this.feedback = 'none';
    } else {
      // Chegou ao fim do exercício
      this.isCompleted = true;
      this.currentQuestion = null;
    }
  }

  checkAnswer(): void {
    if (!this.parsedContent || this.userAnswer.trim() === '') return;

    if (this.userAnswer.trim().toLowerCase() === this.parsedContent.correctAnswer.toLowerCase()) {
      this.feedback = 'correct';
      this.correctAnswersCount++;

      // Aqui você chamaria um serviço para salvar o progresso no backend
    } else {
      this.feedback = 'incorrect';
    }
  }

  nextQuestion(): void {
    // Avança para a próxima questão ou finaliza o exercício
    if (this.chapter && this.currentQuestionIndex < this.chapter.questions.length) {
      this.currentQuestionIndex++;
      this.loadQuestion();
    }
  }

  restartExercise(): void {
    this.currentQuestionIndex = 0;
    this.correctAnswersCount = 0;
    this.isCompleted = false;
    this.loadQuestion();
  }

}
