import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface EaPortalPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EaPortalPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
