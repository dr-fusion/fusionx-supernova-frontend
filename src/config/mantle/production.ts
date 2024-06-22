import { AppConfig } from '../types';
import { commonConfig } from './common';

const config: AppConfig = {
  ...commonConfig,
  mode: 'production',
  // sentryDSN:
  //   'https://692b778079de184efba3b95fd493a72a@o4505549859061760.ingest.us.sentry.io/4507033812140037',
};
export default config;
