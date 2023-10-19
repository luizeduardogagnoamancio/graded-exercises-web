import { Component, OnInit, ViewChild } from '@angular/core';
import { ExercisesServiceTsService } from '../services/exercises.service.ts.service';
import { Exercise } from '../model/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-verb-to-be',
  templateUrl: './verb-to-be.component.html',
  styleUrls: ['./verb-to-be.component.scss']
})
export class VerbToBeComponent implements OnInit{
  @ViewChild('stepper') stepper: MatStepper | null = null;
  exercises: Exercise[] = [];
  duration: string = "500";
  selectedAnswer: string = "";
  correctAnswer: string = "";
  checked:boolean = false;
  hasBeenReset:boolean = false;
  isEditable:boolean = false;

  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['', Validators.required]});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['', Validators.required]});

  ngOnInit(): void {
      /* this.getExercicios(); */
      this.montaExercicioSoFront();
  }

  constructor(private exerciseService: ExercisesServiceTsService, private _formBuilder: FormBuilder) {
    this.stepper = null;
  }



  getExercicios():void {
    this.exerciseService.getExercicios().subscribe(response => {
      this.exercises = response; // Extrai o array exercises da resposta
      console.log(this.exercises);
    });
  }

  montaExercicioSoFront():void {
    this.exercises = [
      { _id: "1", number: "1", title: "Teste", sentence: "teste", answers: ["to be", "will", "are", "together"], cAnswer: "to be", chapter: "2"},
      { _id: "1", number: "1", title: "Teste", sentence: "teste", answers: ["to be", "will", "are", "together"], cAnswer: "to be", chapter: "2"},
      { _id: "1", number: "1", title: "Teste", sentence: "teste", answers: ["to be", "will", "are", "together"], cAnswer: "to be", chapter: "2"}
  ];
  }

  checkAnswer(answer:string, cAnswer:string|undefined):boolean {
    return answer == cAnswer? true : false;

  }

  checkAll():void {
    this.checked = true;
    if (this.stepper) {
      this.isEditable = true;
      this.stepper.selectedIndex = 0;
    }
  }

  resetStepper() {
    if (this.stepper) {
      this.stepper.reset();
      this.hasBeenReset = true;
      this.checked = false;
    }
  }
}
