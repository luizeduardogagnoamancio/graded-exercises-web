export interface Question {
  id: number;
  questionType: 'FILL_IN_THE_BLANK' | 'MULTIPLE_CHOICE';
  content: string;
}
