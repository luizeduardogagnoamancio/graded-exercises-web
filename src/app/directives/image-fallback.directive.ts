import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
  standalone: true
})
export class ImageFallbackDirective {
  @Input() appImageFallback: string = 'assets/images/default-avatar.png';

  constructor(private elementRef: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = this.elementRef.nativeElement;
    element.src = this.appImageFallback;
  }
}
