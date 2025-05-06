import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'painel-lateral',
  templateUrl: './painel-lateral.component.html',
  styleUrls: ['./painel-lateral.component.scss'],
  imports: [ButtonModule, SelectButtonModule, RouterModule]
})
export class PainelLateralComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
