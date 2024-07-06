import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AvoidTheCobComponent } from "./components/avoid-the-cob/avoid-the-cob.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [RouterOutlet, RouterLink, AvoidTheCobComponent]
})
export class AppComponent {
  title = 'website';
}
