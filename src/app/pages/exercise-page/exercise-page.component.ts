import { UserAnswerService } from './../../services/user-answer.service';
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
  chapter: ChapterDetail | null = null;
  currentQuestion: Question | null = null;
  parsedContent: any = null;

  currentQuestionIndex = 0;
  correctAnswersCount = 0;
  isCompleted = false;

  userAnswer = '';
  feedback: 'correct' | 'incorrect' | 'none' = 'none';
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private userAnswerService: UserAnswerService
  ) { }

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
          this.isCompleted = false;
          this.currentQuestionIndex = data.startQuestionIndex;
          this.correctAnswersCount = data.startQuestionIndex;

          this.loadQuestion();
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
      this.isCompleted = true;
      this.currentQuestion = null;
    }
  }

  checkAnswer(): void {
    if (!this.parsedContent || this.userAnswer.trim() === '') return;

    if (this.userAnswer.trim().toLowerCase() === this.parsedContent.correctAnswer.toLowerCase()) {
      this.feedback = 'correct';
      this.correctAnswersCount++;

      console.log("teste")
      console.log("current question", this.currentQuestion)
      console.log("current question id", this.currentQuestion?.id)

      this.userAnswerService.saveAnswer(this.currentQuestion ? this.currentQuestion.id : 0, true).subscribe({
        next: () => console.log(`Progresso salvo para a questão ${this.currentQuestion?.id}`),
        error: (err) => console.error("Falha ao salvar progresso:", err)
      });

    } else {
      this.feedback = 'incorrect';
    }
  }

  nextQuestion(): void {
    if (this.chapter && this.currentQuestionIndex < this.chapter.questions.length) {
      this.currentQuestionIndex++;
      this.loadQuestion();
    }
  }

  restartExercise(): void {
    if (!this.chapter) return;

    this.isLoading = true;
    this.userAnswerService.resetChapterProgress(this.chapter.id).subscribe({
      next: () => {
        console.log(`Progresso para o capítulo ${this.chapter?.id} foi resetado no backend.`);

        this.currentQuestionIndex = 0;
        this.correctAnswersCount = 0;
        this.isCompleted = false;

        this.loadQuestion();

        this.isLoading = false;
      },
      error: (err) => {
        console.error("Falha ao resetar o progresso:", err);
        this.error = "Não foi possível reiniciar o exercício. Tente novamente.";
        this.isLoading = false;
      }
    });
  }

}
