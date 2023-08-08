// import('./bootstrap')
// 	.catch(err => console.error(err));

import {
  loadManifest,
  loadRemoteEntry,
  setManifest,
} from '@angular-architects/module-federation';
loadManifest('/assets/mf.manifest.json')
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));

// loadEntry รอไว้ก่อน
// loadRemoteEntry({
//   type: 'module',
//   remoteEntry: 'http://localhost:4201/remoteEntry.js',
// })
//   .catch((err) => console.error(err))
//   .then((_) => import('./bootstrap'))
//   .catch((err) => console.error(err));

// ไว้ดึง manifest จาก api
// setManifest()

// โหลดแบบ script จะสร้าง tag script
// เดาว่าถ้าจะไว้ใช้โหลดพวก web component
// loadRemoteEntry({
//   type: 'script',
//   remoteName: 'mfe1',
//   remoteEntry: 'http://localhost:4201/remoteEntry.js',
// })
