import { Component } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
