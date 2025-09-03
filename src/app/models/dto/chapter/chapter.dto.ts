import { Question } from "../question/question.dto";

export interface ChapterDetail {
  id: number;
  title: string;
  description: string;
  startQuestionIndex: number;
  questions: Question[];
}
