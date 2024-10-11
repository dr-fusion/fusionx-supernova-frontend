import ethereumDev from './ethereum/development';
import ethereumProd from './ethereum/production';
import seiDev from './sei/development';
import seiProd from './sei/production';

import { handleConfigOverrides } from './utils';
import mantleDev from './mantle/development';
import mantleProd from './mantle/production';
export { pairsToExchangeMapping } from './utils';

const configs = {
  ethereum: {
    development: ethereumDev,
    production: ethereumProd,
  },
  sei: {
    development: seiDev,
    production: seiProd,
  },

  mantle: {
    development: mantleDev,
    production: mantleProd,
  },
};
type Network = keyof typeof configs;
type Mode = 'development' | 'production';

const network = (import.meta.env.VITE_NETWORK || 'mantle') as Network;
const mode = import.meta.env.MODE as Mode;

if (!configs[network]) {
  const networks = Object.keys(configs).join(' or ');
  throw new Error(`VITE_NETWORK should be ${networks}, got "${network}"`);
}
if (!configs[network][mode]) {
  const modes = Object.keys(configs[network]).join(' or ');
  throw new Error(`NODE_ENV should be ${modes}, got "${mode}"`);
}


export const networks = Object.entries(configs)
  .filter(([_id, config]) => config[mode].hidden !== true)
  .map(([id, config]) => {
    return {
      id,
      name: config[mode].network.name,
      logoUrl: config[mode].network.logoUrl,
      chainId: config[mode].network.chainId,
      isCurrentNetwork: network === id,
      appUrl: config[mode].appUrl,
    };
  });

export const defaultConfig = configs[network][mode];
const currentConfig = handleConfigOverrides(defaultConfig);
export default currentConfig;
