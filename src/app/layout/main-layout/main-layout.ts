import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Themeservice } from '../../core/services/themeservice';
import { Breadcrumb } from '../../breadcrumb/breadcrumb/breadcrumb';
import { Loadingservice } from '../../core/services/loadingservice';
import { Toasterror } from '../../core/services/toasterror';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, Navbar, Breadcrumb],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  themeservie = inject(Themeservice);
  loadingservice = inject(Loadingservice);
  toasterror = inject(Toasterror);

  // حالة فتح وإغلاق السايدبار
  isopenersidebar = signal<boolean>(false);
  isMobile = false;

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // md breakpoint في Tailwind
  }

  togglemenu() {
    this.isopenersidebar.update((v) => !v);
  }
}