import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { LoaderComponent } from './loader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoaderComponent', () => {
  let spectator: Spectator<LoaderComponent>;
  const createComponent = createComponentFactory({
    component: LoaderComponent,
    imports: [ProgressSpinnerModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the loader component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display the default loading message', () => {
    const messageElement = spectator.query('p');

    expect(messageElement).toHaveText('Loading...');
  });

  it('should display a custom loading message', () => {
    spectator.setInput('message', 'Please wait...');

    const messageElement = spectator.query('p');

    expect(messageElement).toHaveText('Please wait...');
  });
});
