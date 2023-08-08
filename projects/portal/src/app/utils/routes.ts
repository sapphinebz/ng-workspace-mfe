import { Routes } from '@angular/router';
import { CustomManifest } from '../../shared/models/custom-remote-config';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { routes } from '../app.routes';

export function buildRoutes(options: CustomManifest): Routes {
  const lazyRoutes: Routes = Object.keys(options).map((key) => {
    const entry = options[key];
    return {
      path: entry.routePath,
      loadComponent: () =>
        loadRemoteModule({
          type: 'manifest',
          remoteName: key,
          exposedModule: entry.exposedModule,
        }).then((m) => m[entry.ngModuleName]),
    };
  });
  return [...routes, ...lazyRoutes];
}
