import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { CountryPickerService } from './country-picker-service';

@Component({
  selector: 'app-country-picker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './country-picker.component.html',
})
export class CountryPickerComponent implements OnInit {
  @HostBinding('class') hostClasses = 'flex h-full flex-col items-center overflow-hidden bg-mat-black/85';
  @Input() photos?: { header: string; urls: string[]; icons: string[] }[];
  @Output() selected = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countriesService: CountryPickerService,
  ) {}

  ngOnInit() {
    this.handleRouteParams();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async () => this.handleRouteParams());
  }

  select(index: number) {
    this.countriesService.select(index);
    this.selected.emit();
  }

  isSelected(index: number) {
    return this.countriesService.index === index;
  }

  private async handleRouteParams() {
    if (this.route.firstChild) {
      const param = await firstValueFrom(this.route.firstChild.params);
      this.countriesService.select(param['id']);
    } else {
      this.countriesService.select(undefined);
    }
  }
}
