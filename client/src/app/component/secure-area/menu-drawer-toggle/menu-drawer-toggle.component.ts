import { Component, OnInit } from '@angular/core';
import { MenuDrawerService } from 'src/app/component/secure-area/menu-drawer/menu-drawer.service';

@Component({
  selector: 'app-menu-drawer-toggle',
  templateUrl: './menu-drawer-toggle.component.html',
  styleUrls: ['./menu-drawer-toggle.component.scss']
})
export class MenuDrawerToggleComponent implements OnInit {

  constructor(readonly menuDrawerService: MenuDrawerService) {
  }

  ngOnInit(): void {
  }

}
