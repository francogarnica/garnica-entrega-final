import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAgrandado]'
})
export class AgrandadoDirective {

  @Input()
  appAgrandado = '20px';

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.establecerTamLetra();
  }

  establecerTamLetra(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'font-size', this.appAgrandado
    );
  }

}

