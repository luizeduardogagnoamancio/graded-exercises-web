import { Component, OnInit } from '@angular/core';
import { ExercisesServiceTsService } from '../services/exercises.service.ts.service';
import { Exercise } from '../model/card';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-verb-to-be',
  templateUrl: './verb-to-be.component.html',
  styleUrls: ['./verb-to-be.component.scss']
})
export class VerbToBeComponent implements OnInit{

  exercises: Exercise[] = [];
  duration: string = "500";

  ngOnInit(): void {
      this.getExercicios()
  }

  constructor(private exerciseService: ExercisesServiceTsService, private _formBuilder: FormBuilder ) {}
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  getExercicios():void {
    this.exerciseService.getExercicios().subscribe(response => {
      this.exercises = response; // Extrai o array exercises da resposta
      console.log(this.exercises);
    });
  }
}
