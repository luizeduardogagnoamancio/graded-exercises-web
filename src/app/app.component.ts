import { Component } from '@angular/core';
import { LayoutComponent } from './modules/layout/layout.component';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
    this.primeng.ripple.set(true);
  }

  title = 'graded-exercises-web';
}
