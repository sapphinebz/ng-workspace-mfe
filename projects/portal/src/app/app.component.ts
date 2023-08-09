import {
  Component,
  OnInit,
  ViewContainerRef,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { from } from 'rxjs';
import {
  getManifest,
  loadRemoteModule,
} from '@angular-architects/module-federation';
import {
  CustomManifest,
  CustomRemoteConfig,
} from '../shared/models/custom-remote-config';
import { buildRoutes } from './utils/routes';
import { LookupService } from '../shared/services/lookup.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { PluginProxyComponent } from '../shared/components/plugin-proxy/plugin-proxy.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, RouterLink, PluginProxyComponent],
})
export class AppComponent implements OnInit {
  title = 'portal';
  vc = inject(ViewContainerRef);
  router = inject(Router);
  remotes: CustomRemoteConfig[] = [];
  lookupService = inject(LookupService);

  pluginOptions = toSignal(this.lookupService.lookUp(), { initialValue: [] });

  ngOnInit(): void {
    const manifest = getManifest<CustomManifest>();
    console.log(manifest);
    const routes = buildRoutes(manifest);
    this.router.resetConfig(routes);
    this.remotes = Object.values(manifest);

    // ใช้คู่กับ load loadRemoteEntry
    // เอา entry ที่โหลดไว้ก่อน ดึงมาสร้าง component
    // loadRemoteModule({
    //   type: 'module',
    //   remoteEntry: 'http://localhost:4201/remoteEntry.js',
    //   exposedModule: './Component',
    // }).then((v) => console.log(v.AppComponent));
  }

  addComponent() {
    // from(import('mfe1/Component')).subscribe((m) => {
    //   this.vc.createComponent(m.AppComponent);
    // });
    // from(
    //   loadRemoteModule({
    //     type: 'manifest',
    //     remoteName: 'mfe1',
    //     exposedModule: './Component',
    //   })
    // ).subscribe((m) => {
    //   this.vc.createComponent(m.AppComponent);
    // });
  }
}
