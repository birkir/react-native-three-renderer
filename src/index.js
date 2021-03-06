import { Navigation } from 'react-native-navigation';
import { Screens, startApp } from 'screens';
import { Sentry } from 'react-native-sentry';
import codePush from 'react-native-code-push';
import isEmpty from 'lodash/isEmpty';
import config from 'config';
import Store, { StoreProvider } from 'store';
import 'utils/xhr';

if (!__DEV__ && !isEmpty(config.SENTRY_DSN)) {

  // Initialize Sentry
  if (config.SENTRY_DSN && config.SENTRY_DSN !== '') {
    Sentry.config(config.SENTRY_DSN).install();
  }

  // Set Sentry CodePush metadata
  codePush.getUpdateMetadata().then((update) => {
    if (update) {
      Sentry.setVersion(`${update.appVersion}-codepush:${update.label}`);
    }
  });
}

const store = new Store();

// Register screens
Array.from(Screens.entries()).forEach(([screenConst, screenModule]) =>
  Navigation.registerComponent(
    screenConst,
    screenModule,
    store,
    codePush(StoreProvider),
  ));

store
  .setup()
  .then(() => {
    startApp();
  });
