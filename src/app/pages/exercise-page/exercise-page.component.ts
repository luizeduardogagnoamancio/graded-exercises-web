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
  standalone: true, // Garanta que o componente é standalone
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './exercise-page.component.html',
  styleUrl: './exercise-page.component.scss'
})
export class ExercisePageComponent implements OnInit {
  chapterDetail: ChapterDetail | null = null;
  currentQuestion: Question | null = null;
  parsedContent: any = null;

  currentQuestionIndex = 0;
  correctAnswersCount = 0;
  isCompleted = false;

  userAnswer = '';
  feedback: 'correct' | 'incorrect' | 'none' = 'none';
  isLoading = true;
  error: string | null = null;

  // NOVO ESTADO para controlar a revelação da resposta
  answerRevealed = false;

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
          this.chapterDetail = data;
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
    if (this.chapterDetail && this.chapterDetail.questions.length > this.currentQuestionIndex) {
      this.currentQuestion = this.chapterDetail.questions[this.currentQuestionIndex];
      this.parsedContent = JSON.parse(this.currentQuestion.content);
      // Reseta os estados para a nova questão
      this.userAnswer = '';
      this.feedback = 'none';
      this.answerRevealed = false;
    } else {
      this.isCompleted = true;
      this.currentQuestion = null;
    }
  }

  checkAnswer(): void {
    if (!this.parsedContent || this.userAnswer.trim() === '') return;

    if (this.userAnswer.trim().toLowerCase() === this.parsedContent.correctAnswer.toLowerCase()) {
      this.feedback = 'correct';
      this.correctAnswersCount++; // Incrementa o contador de acertos

      this.userAnswerService.saveAnswer(this.currentQuestion!.id, true).subscribe({
        next: () => console.log(`Progresso salvo para a questão ${this.currentQuestion?.id}`),
        error: (err) => console.error("Falha ao salvar progresso:", err)
      });

    } else {
      this.feedback = 'incorrect';
    }
  }

  showAnswer(): void {
    this.answerRevealed = true;  // Ativa o estado que revela a resposta e o botão "Continue"
    this.feedback = 'incorrect'; // Garante que a área de feedback apareça
  }

  nextQuestion(): void {
    if (this.chapterDetail && this.currentQuestionIndex < this.chapterDetail.questions.length) {
      this.currentQuestionIndex++;
      this.loadQuestion();
    }
  }

  restartExercise(): void {
    if (!this.chapterDetail) return;
    this.isLoading = true;
    this.userAnswerService.resetChapterProgress(this.chapterDetail.id).subscribe({
      next: () => {
        this.startExercise();
      },
      error: (err) => {
        this.error = "Não foi possível reiniciar o exercício. Tente novamente.";
        this.isLoading = false;
      }
    });
  }
}
