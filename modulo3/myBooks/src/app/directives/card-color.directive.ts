import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardColor]'
})
export class CardColorDirective implements OnInit {
  @Input() appCardColor: number = 0; // Índice de la card

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.applyCardColor();
  }

  private applyCardColor() {
    // Si es par (incluyendo 0), aplicar un color, si es impar, otro
    const isEven = this.appCardColor % 2 === 0;
    
    if (isEven) {
      // Color para posiciones pares
      this.renderer.addClass(this.el.nativeElement, 'card-even');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f0f8ff');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #007bff');
    } else {
      // Color para posiciones impares  
      this.renderer.addClass(this.el.nativeElement, 'card-odd');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff5f5');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #dc3545');
    }
  }
}
