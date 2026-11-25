import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ENTITY_LIST } from './core/config/entities.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly entities = ENTITY_LIST;
  protected readonly collapsed = signal(false);

  protected toggle() {
    this.collapsed.update(v => !v);
  }
}