import { Component, OnInit } from '@angular/core';
import { ChapterDetail } from '../../models/dto/chapter/chapter.dto';
import { Question } from '../../models/dto/question/question.dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAnswerService } from '../../services/user-answer.service';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-exercise-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TitleCasePipe, DragDropModule],
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.scss']
})
export class ExercisePageComponent implements OnInit {
  chapterDetail: ChapterDetail | null = null;
  currentQuestion: Question | null = null;
  parsedContent: any = null;
  currentFormatContent: any = null;

  availableFormats: string[] = [];
  selectedFormat: 'FILL_IN_THE_BLANK' | 'MULTIPLE_CHOICE' | 'DRAG_AND_DROP' = 'FILL_IN_THE_BLANK';

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
  tempSelectedFormat!: 'FILL_IN_THE_BLANK' | 'MULTIPLE_CHOICE' | 'DRAG_AND_DROP';

  dropZoneData: string[] = [];
  availableDragOptions: string[] = [];

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
      this.dropZoneData = []; // Limpa a caixa de resposta
      this.feedback = 'none';
      this.answerRevealed = false;

      if (this.selectedFormat === 'DRAG_AND_DROP' && this.currentFormatContent) {
        this.availableDragOptions = [...this.currentFormatContent.options];
      }
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
    this.dropZoneData = [];
    this.feedback = 'none';

    if (this.currentFormatContent) {
      this.availableDragOptions = [...this.currentFormatContent.options];
    }
  }

  selectAnswer(index: number): void {
    if (this.feedback !== 'correct') {
      this.userAnswerIndex = index;
    }
  }

  // Lógica de onDrop CORRIGIDA E MELHORADA
  onDrop(event: CdkDragDrop<string[]>): void {
    if (this.feedback === 'correct') return;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Impede que mais de um item seja solto na caixa de resposta
      if (event.container.id === 'answer-box' && event.container.data.length > 0) {
        return;
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  checkAnswer(): void {
    if (!this.currentQuestion || !this.currentFormatContent) return;
    let isCorrect = false;
    if (this.selectedFormat === 'FILL_IN_THE_BLANK') {
      isCorrect = this.userAnswer.trim().toLowerCase() === this.currentFormatContent.correctAnswer.toLowerCase();
    } else if (this.selectedFormat === 'MULTIPLE_CHOICE') {
      isCorrect = this.userAnswerIndex === this.currentFormatContent.correctAnswerIndex;
    } else if (this.selectedFormat === 'DRAG_AND_DROP') {
      // Verifica se há um item na caixa de resposta e se ele está correto
      isCorrect = this.dropZoneData.length === 1 && this.dropZoneData[0] === this.currentFormatContent.correctAnswer;
    }

    if (isCorrect) {
      this.feedback = 'correct';
      this.correctAnswersCount++;
      this.userAnswerService.saveAnswer(this.currentQuestion.id, true).subscribe({
        next: () => console.log(`Progress saved for question ${this.currentQuestion?.id}`),
        error: (err) => console.error("Failed to save progress:", err)
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
      next: () => this.startExercise(),
      error: (err) => {
        this.error = "Could not restart the exercise. Please try again.";
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
