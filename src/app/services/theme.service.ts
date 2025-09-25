import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: Theme = 'light';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    this.currentTheme = savedTheme || 'light';
    this.applyTheme(this.currentTheme);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
  }

  private applyTheme(theme: Theme) {
    localStorage.setItem('app-theme', theme);

    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  getCurrentTheme(): Theme {
    return this.currentTheme;
  }
}
