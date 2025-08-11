import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';


@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ImageFallbackDirective
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  @ViewChild('profileModal') profileModal!: ElementRef;
  @ViewChild('profileTrigger') profileTrigger!: ElementRef;
  isSidebarVisible = false;
  isProfileModalVisible = false;

  userProfileUrl = 'assets/images/default-avatar.png';

  constructor(public authService: AuthService) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedInsideTrigger = this.profileTrigger.nativeElement.contains(event.target);
    const clickedInsideModal = this.profileModal?.nativeElement.contains(event.target);

    if (this.isProfileModalVisible && !clickedInsideTrigger && !clickedInsideModal) {
      this.isProfileModalVisible = false;
    }
  }

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
