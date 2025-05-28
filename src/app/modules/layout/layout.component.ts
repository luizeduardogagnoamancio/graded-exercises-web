import { Component } from '@angular/core';
import { PainelLateralComponent } from './painel-lateral/painel-lateral.component';
import { PainelSuperiorComponent } from './painel-superior/painel-superior.component';
import { PainelCentralComponent } from './painel-central/painel-central.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule, // Adicione aqui
    PainelLateralComponent,
    PainelSuperiorComponent,
    PainelCentralComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isMenuLateralAberto = false;
  isTelaPequena = window.innerWidth <= 768;

  constructor() {
    // Atualiza isTelaPequena em redimensionamento
    window.addEventListener('resize', () => {
      this.isTelaPequena = window.innerWidth <= 768;
      if (!this.isTelaPequena) {
        this.isMenuLateralAberto = false;
      }
    });
  }

  toggleMenu(): void {
    this.isMenuLateralAberto = !this.isMenuLateralAberto;
  }
}
