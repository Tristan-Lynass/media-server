import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-menu-drawer',
  templateUrl: './menu-drawer.component.html',
  styleUrls: [ './menu-drawer.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDrawerComponent implements OnInit, OnDestroy {

  private readonly destroyed = new Subject();

  constructor(readonly sessionService: SessionService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  logout(): void {
    this.sessionService.logout().pipe(
      takeUntil(this.destroyed)
    ).subscribe();
  }
}
