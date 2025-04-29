import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LuggageChecklistComponent } from './checklist/checklist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LuggageChecklistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'luggage-app-pwa';
}
