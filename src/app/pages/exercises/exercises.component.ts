import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExerciseCard } from '../../models/dto/exercises/exerciseCard.dto';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent implements OnInit {
  exercises: ExerciseCard[] = [];
  filteredExercises: ExerciseCard[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe({
      next: (data) => {
        this.exercises = data;
        this.filteredExercises = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Failed to load exercises. Please try again later.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  filterExercises(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredExercises = this.exercises;
      return;
    }
    this.filteredExercises = this.exercises.filter(exercise =>
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
