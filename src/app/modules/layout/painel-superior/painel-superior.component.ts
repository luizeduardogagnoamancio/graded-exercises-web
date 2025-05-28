import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'painel-superior',
  templateUrl: './painel-superior.component.html',
  styleUrls: ['./painel-superior.component.scss']
})
export class PainelSuperiorComponent implements OnInit {
  @Output() toggleMenuLateral = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
