import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService} from '../../services/profile.service';
import { UserProfile } from '../../models/dto/profile/userProfile.dto';
import { AvatarSelectionComponent } from '../../components/avatar-selection/avatar-selection.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AvatarSelectionComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  isLoading = true;
  error: string | null = null;
  isAvatarModalVisible = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      next: (data) => {
        this.userProfile = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile data.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  openAvatarModal(): void {
    this.isAvatarModalVisible = true;
  }

  closeAvatarModal(): void {
    this.isAvatarModalVisible = false;
  }

  handleAvatarSelected(avatarUrl: string): void {
    this.profileService.updateAvatar(avatarUrl).subscribe({
      next: () => {
        if (this.userProfile) {
          this.userProfile.avatarUrl = avatarUrl;
        }
        this.closeAvatarModal();
      },
      error: (err) => {
        console.error("Failed to update avatar", err);
        this.closeAvatarModal();
      }
    });
  }
}
