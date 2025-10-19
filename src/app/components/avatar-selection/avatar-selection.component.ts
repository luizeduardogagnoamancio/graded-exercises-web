import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-selection.component.html',
  styleUrls: ['./avatar-selection.component.scss']
})
export class AvatarSelectionComponent {
  @Output() close = new EventEmitter<void>();
  @Output() avatarSelected = new EventEmitter<string>();

  avatars: string[] = [
    'assets/images/avatars/urso.png',
    'assets/images/avatars/formiga.png',
    'assets/images/avatars/baleia.png',
    'assets/images/avatars/raposa.png',
  ];
  selectedAvatar: string | null = null;

  selectAvatar(avatarUrl: string): void {
    this.selectedAvatar = avatarUrl;
  }

  confirmSelection(): void {
    if (this.selectedAvatar) {
      this.avatarSelected.emit(this.selectedAvatar);
    }
  }
}
