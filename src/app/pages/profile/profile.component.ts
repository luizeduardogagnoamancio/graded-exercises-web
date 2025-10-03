import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService} from '../../services/profile.service';
import { UserProfile } from '../../models/dto/profile/userProfile.dto';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  isLoading = true;
  error: string | null = null;

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
}
