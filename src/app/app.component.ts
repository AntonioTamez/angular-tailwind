import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, NgxSonnerToaster],
})
export class AppComponent {
  title = 'Sistema Educativo';

  constructor(public themeService: ThemeService) {}
}
