import { Component } from '@angular/core';
import { PainelLateralComponent } from './painel-lateral/painel-lateral.component';
import { PainelSuperiorComponent } from './painel-superior/painel-superior.component';
import { PainelCentralComponent } from './painel-central/painel-central.component';
import { PainelLateralDireitoComponent } from './painel-lateral-direito/painel-lateral-direito.component';

@Component({
  selector: 'app-layout',
  imports: [PainelLateralComponent,
            PainelSuperiorComponent,
            PainelCentralComponent,
            PainelLateralDireitoComponent
          ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
