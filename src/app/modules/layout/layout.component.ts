import { Component, ElementRef, HostListener, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Subscription } from 'rxjs';
import { UserProfile } from '../../models/dto/profile/userProfile.dto';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ImageFallbackDirective,
    FormsModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('profileModal') profileModal!: ElementRef;
  @ViewChild('profileTrigger') profileTrigger!: ElementRef;
  isSidebarVisible = false;
  isProfileModalVisible = false;
  userAvatarUrl: string | null = null;
  private authSubscription!: Subscription;

  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private profileService: ProfileService // Injetar ProfileService
  ) {}

  ngOnInit(): void {
    this.themeService.loadTheme();
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.loadUserAvatar();
      } else {
        this.userAvatarUrl = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  loadUserAvatar(): void {
    this.profileService.getUserProfile().subscribe({
      next: (profile: UserProfile) => {
        this.userAvatarUrl = profile.avatarUrl;
      },
      error: (err) => {
        console.error('Failed to load user avatar for layout:', err);
        this.userAvatarUrl = null;
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedInsideTrigger = this.profileTrigger?.nativeElement.contains(event.target);
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

  handleToggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
