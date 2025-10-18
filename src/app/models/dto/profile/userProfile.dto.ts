import { ChapterProgress } from "../chapter/chapterProgress.dto";

export interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
  completedChapters: number;
  totalChapters: number;
  dailyStreak: number;
  chapterProgress: ChapterProgress[];
  avatarUrl: string | null;
}
