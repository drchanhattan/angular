import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IconRegistry {
  private cache = new Map<string, string>();

  async get(name: string): Promise<string> {
    if (this.cache.has(name)) return this.cache.get(name)!;

    const raw = await fetch(`/icons/${name}.svg`).then((r) => r.text());
    this.cache.set(name, raw);
    return raw;
  }
}
