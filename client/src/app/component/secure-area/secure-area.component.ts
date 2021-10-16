import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuDrawerService } from 'src/app/component/secure-area/menu-drawer/menu-drawer.service';

@Component({
  selector: 'app-secure-area',
  templateUrl: './secure-area.component.html',
  styleUrls: ['./secure-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecureAreaComponent implements OnInit, OnDestroy {

  private readonly destroyed = new Subject();

  @ViewChild('drawer')
  menuDrawer: MatDrawer

  constructor(private readonly menuDrawerService: MenuDrawerService) { }

  ngOnInit(): void {
    this.menuDrawerService.toggle$.pipe(
      takeUntil(this.destroyed)
    ).subscribe(() => this.menuDrawer.toggle());
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
