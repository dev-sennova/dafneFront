import { Component, HostListener } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import{ GlobalConstants } from './common/global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  menuVisible = false;

  title = GlobalConstants.siteTitle;

  constructor(public authService: LoginService, public router: Router, private breakpointObserver: BreakpointObserver) { }

  logout() {
    this.authService.doLogout();
    this.router.navigate(['login']);
  }

  changepassword(){
    this.router.navigate(['change-password'])
  }

  
  @HostListener('document:click', ['$event'])
clickout(event: MouseEvent) {
  const targetElement = event.target as HTMLElement;
  const menuButton = document.querySelector('.menu-button') as HTMLElement;

  if (menuButton && menuButton.contains(targetElement)) {
    this.menuVisible = true;
  } else {
    this.menuVisible = false;
  }
}
  
}
