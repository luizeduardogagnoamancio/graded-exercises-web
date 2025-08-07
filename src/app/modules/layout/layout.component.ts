import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isSidebarVisible = false;
  isProfileModalVisible = false;

  constructor(public authService: AuthService) {}

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleProfileModal(): void {
    this.isProfileModalVisible = !this.isProfileModalVisible;
  }

  handleLogout(): void {
    this.toggleProfileModal();
    this.authService.logout();
  }
}
