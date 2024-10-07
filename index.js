/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AppClip} from './index.appclip';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('AppClip', () => AppClip);