import { Component, Input, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuService } from '../../services/menu.service';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobilecomponent';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [AngularSvgIconModule, NavbarMenuComponent, ProfileMenuComponent, NavbarMobileComponent],
})
export class NavbarComponent implements OnInit {

  isAuthenticated:boolean = false;

  token!: string | null;
  name!: string;
  userName!: string;

  constructor(private menuService: MenuService, private autService: AuthService) {
    this.token = this.autService.getTokenFromLocalStorage();

    if(this.token!){
      this.isAuthenticated = true;
      const decodedToken = this.decodeToken(this.token!);
      this.name = decodedToken.name
      this.userName = decodedToken.username;
    }
  }

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload); 
    return JSON.parse(decodedPayload);
  }
}
