import {Component, PLATFORM_ID, Inject, HostListener} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import {MaterialTheme, ThemeService} from '../../services/';
import {distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // MARK: Properties
  isTop = false;
  isDark = false;
  theme = MaterialTheme.light;
  themes = [
    { 'title': 'Dark', 'value': MaterialTheme.dark},
    { 'title': 'Light', 'value': MaterialTheme.light}];

  // MARK: Initialization
  constructor(private overlayContainer: OverlayContainer,
              @Inject(PLATFORM_ID) private platform: Object,
              private themeService: ThemeService) {
    themeService.currentTheme
      .pipe(distinctUntilChanged())
      .subscribe(theme => {
        this.theme = theme;
        overlayContainer.getContainerElement().classList.add(theme);
        this.isDark = theme === MaterialTheme.dark;
      });
  }

  // MARK: Public methods
  public changeTheme(theme: MaterialTheme) {
    this.themeService.changeThemeTo(theme);
  }

  // MARK: Listeners
  @HostListener('window:scroll', ['$event']) onScrollEvent(_) {
    const scrollHeight = window.pageYOffset;
    const height = window.innerHeight;
    const desiredHeight = 0.2 * height;
    this.isTop = !(scrollHeight <= desiredHeight);
  }
}
