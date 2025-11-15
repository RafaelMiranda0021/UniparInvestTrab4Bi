import { Component } from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {Sidebar} from '../sidebar/sidebar';
import {Header} from '../header/header';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    MatSidenavModule,
    Sidebar,
    MatSidenav,
    Header,
    RouterOutlet
  ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

}
