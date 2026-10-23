import { Directive, ElementRef, Renderer2, computed, effect, inject, input } from '@angular/core';
import { IconRegistry } from './svg-icon-registry.module';

@Directive({
  selector: '[icon]',
  providers: [IconRegistry],
  host: { '[class]': 'hostClasses()' },
})
export class IconDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly registry = inject(IconRegistry);

  protected readonly hostClasses = computed(() => [
    // Layout
    'flex',
    'items-center',
    'justify-center',
  ]);

  public readonly icon = input.required<string>();

  constructor() {
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
