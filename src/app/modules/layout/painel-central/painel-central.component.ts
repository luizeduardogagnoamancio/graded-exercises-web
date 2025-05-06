import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'painel-central',
  templateUrl: './painel-central.component.html',
  imports: [RouterOutlet, RouterModule],
  styleUrls: ['./painel-central.component.scss']
})
export class PainelCentralComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
