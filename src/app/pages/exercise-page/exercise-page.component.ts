import { UserAnswerService } from './../../services/user-answer.service';
import { Component, OnInit } from '@angular/core';
import { ChapterDetail } from '../../models/dto/chapter/chapter.dto';
import { Question } from '../../models/dto/question/question.dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TitleCasePipe],
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.scss']
})
export class ExercisePageComponent implements OnInit {
  chapterDetail: ChapterDetail | null = null;
  currentQuestion: Question | null = null;
  parsedContent: any = null;
  currentFormatContent: any = null;

  availableFormats: string[] = [];
  selectedFormat: Question['questionType'] = 'FILL_IN_THE_BLANK';

  currentQuestionIndex = 0;
  correctAnswersCount = 0;
  isCompleted = false;

  userAnswer = '';
  userAnswerIndex: number | null = null;
  feedback: 'correct' | 'incorrect' | 'none' = 'none';
  isLoading = true;
  error: string | null = null;
  answerRevealed = false;

  isSettingsModalVisible = false;
  tempSelectedFormat: Question['questionType'] = this.selectedFormat;

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

          if (this.chapterDetail.questions.length > 0) {
              const firstQuestionContent = JSON.parse(this.chapterDetail.questions[0].content);
              this.selectedFormat = firstQuestionContent.defaultFormat;
          }

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

      this.availableFormats = Object.keys(this.parsedContent.formats);
      this.setFormatContent();

      this.userAnswer = '';
      this.userAnswerIndex = null;
      this.feedback = 'none';
      this.answerRevealed = false;
    } else {
      this.isCompleted = true;
      this.currentQuestion = null;
    }
  }

  private setFormatContent(): void {
    if (this.parsedContent && this.parsedContent.formats) {
      this.currentFormatContent = this.parsedContent.formats[this.selectedFormat];
    }
  }

  changeFormat(format: any): void {
    this.selectedFormat = format as Question['questionType'];
    this.setFormatContent();
    this.userAnswer = '';
    this.userAnswerIndex = null;
    this.feedback = 'none';
  }

  selectAnswer(index: number): void {
    if (this.feedback !== 'correct') {
      this.userAnswerIndex = index;
    }
  }

  checkAnswer(): void {
    if (!this.currentQuestion || !this.currentFormatContent) return;

    let isCorrect = false;

    if (this.selectedFormat === 'FILL_IN_THE_BLANK') {
      if (this.userAnswer.trim().toLowerCase() === this.currentFormatContent.correctAnswer.toLowerCase()) {
        isCorrect = true;
      }
    } else if (this.selectedFormat === 'MULTIPLE_CHOICE') {
      if (this.userAnswerIndex === this.currentFormatContent.correctAnswerIndex) {
        isCorrect = true;
      }
    }

    if (isCorrect) {
      this.feedback = 'correct';
      this.correctAnswersCount++;
      this.userAnswerService.saveAnswer(this.currentQuestion.id, true).subscribe({
        next: () => console.log(`Progresso salvo para a questão ${this.currentQuestion?.id}`),
        error: (err) => console.error("Falha ao salvar progresso:", err)
      });
    } else {
      this.feedback = 'incorrect';
    }
  }

  showAnswer(): void {
    this.answerRevealed = true;
    this.feedback = 'incorrect';
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

  openSettingsModal(): void {
    this.tempSelectedFormat = this.selectedFormat;
    this.isSettingsModalVisible = true;
  }

  closeSettingsModal(): void {
    this.isSettingsModalVisible = false;
  }

  confirmSettings(): void {
    if (this.tempSelectedFormat !== this.selectedFormat) {
      this.changeFormat(this.tempSelectedFormat);
    }
    this.closeSettingsModal();
  }

}
