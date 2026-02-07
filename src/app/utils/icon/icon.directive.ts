import { Directive, ElementRef, HostBinding, Renderer2, effect, input } from '@angular/core';
import { IconRegistry } from './svg-icon-registry.module';

@Directive({
  selector: '[icon]',
  providers: [IconRegistry],
})
export class IconDirective {
  @HostBinding('class') hostClasses = [
    // Layout
    'flex',
    'items-center',
    'justify-center',
  ].join(' ');

  icon = input.required<string>();

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private registry: IconRegistry,
  ) {
    effect(async () => {
      const name = this.icon();
      const svg = await this.registry.get(name);
      this.el.nativeElement.innerHTML = '';
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', svg);

      const svgElement = this.el.nativeElement.querySelector('svg');
      if (svgElement) {
        this.renderer.setAttribute(svgElement, 'fill', 'currentColor');
      }
    });
  }
}
