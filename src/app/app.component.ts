import {Component, ElementRef, OnInit} from '@angular/core';
import {OverlayContainer} from "@angular/cdk/overlay";
import {Store} from "@ngrx/store";
import {AppTheme} from "@Store/reducers/theme-reducer";

@Component({
  selector: 'template-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly _overlayContainer: OverlayContainer,
    private readonly otRootRef: ElementRef,
    private readonly store: Store<AppTheme>,
  ) {
  }

  ngOnInit(): void {
      this.store.select("theme").subscribe(newThemeValue => {
          newThemeValue.isDark ? this.applyOverlayContainerTheme('app-demo-light-theme', newThemeValue.name) :
              this.applyOverlayContainerTheme('app-demo-dark-theme', newThemeValue.name);
      })
  }

  public applyOverlayContainerTheme(oldTheme: string, newTheme: string): void {
    if (!!oldTheme && oldTheme !== newTheme) {
      this._overlayContainer.getContainerElement().classList.remove(oldTheme);
      this.otRootRef.nativeElement.classList.remove(oldTheme);
    }
    this._overlayContainer.getContainerElement().classList.add(newTheme);
    this.otRootRef.nativeElement.classList.add(newTheme);
  }


}
