import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginOptions } from '../../models/plugin-options';
import {
  AsyncSubject,
  EMPTY,
  ReplaySubject,
  combineLatest,
  from,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-plugin-proxy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plugin-proxy.component.html',
  styleUrls: ['./plugin-proxy.component.scss'],
})
export class PluginProxyComponent implements OnInit, OnDestroy {
  @ViewChild('placeHolder', { read: ViewContainerRef, static: true }) set vc(
    _vc: ViewContainerRef
  ) {
    this.vc$.next(_vc);
  }

  @Input() set options(_options: PluginOptions) {
    this.options$.next(_options);
  }

  vc$ = new ReplaySubject<ViewContainerRef>(1);
  options$ = new ReplaySubject<PluginOptions>(1);
  onDestroy$ = new AsyncSubject<void>();

  ngOnInit(): void {
    combineLatest([this.vc$, this.options$])
      .pipe(
        switchMap(([vc, options]) => {
          vc.clear();
          if (options) {
            return from(loadRemoteModule(options)).pipe(
              tap((m) => {
                const Component = m[options.componentName];
                vc.createComponent(Component);
              })
            );
          }
          return EMPTY;
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
