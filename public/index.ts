import './index.scss';

import { EaPortalPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new EaPortalPlugin();
}
export { EaPortalPluginSetup, EaPortalPluginStart } from './types';
