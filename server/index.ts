import { PluginInitializerContext } from '../../../src/core/server';
import { EaPortalPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new EaPortalPlugin(initializerContext);
}

export { EaPortalPluginSetup, EaPortalPluginStart } from './types';
