import { AppConfig } from 'config/types';
import IconMANTLELogo from 'assets/logos/mantlelogo.svg';
import { ONE_HOUR_IN_MS } from 'utils/time';

const addresses = {
  MNT: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  WMNT: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
  ZERO: '0x0000000000000000000000000000000000000000',
  USDT: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE',
  USDC: '0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9',
  DAI: '0xB38E748dbCe79849b8298A1D206C8374EFc16DA7',
  WBTC: '0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2',
  PUFF: '0x26a6b0dcdCfb981362aFA56D581e4A7dBA3Be140',
  // MUTO: '0x029d924928888697d3F3d169018d9d98d9f0d6B4',
  LEND: '0x25356aeca4210eF7553140edb9b8026089E49396',
  USDY: '0x5bE26527e817998A7206475496fDE1E68957c5A6',
  MUSD: '0xab575258d37EaA5C8956EfABe71F4eE8F6397cF3',
  LUSD: '0xf93a85d53e4aF0D62bdf3A83CCFc1EcF3EAf9F32',
  AXLUSDC: '0xeb466342c4d449bc9f53a865d5cb90586f405215',
  KTC: '0x779f4E5fB773E17Bc8E809F4ef1aBb140861159a',
};

export const commonConfig: AppConfig = {
  mode: 'development',
  appName: 'Fusionx Supernova',
  appUrl: 'https://supernova.fusionx.finance',
  carbonApi: 'https://api.supernova.fusionx.finance/v1/',
  selectedConnectors: ['MetaMask', 'WalletConnect', 'Coinbase Wallet', 'Safe'],
  walletConnectProjectId: '457f449b7e07626c466754376243ed64',
  isSimulatorEnabled: false,
  policiesLastUpdated: '18 April, 2023',
  network: {
    name: 'Mantle Network',
    logoUrl: IconMANTLELogo,
    chainId: 5000,
    blockExplorer: { name: 'Mantle', url: 'https://explorer.mantle.xyz/' },
    rpc: {
      url: import.meta.env.VITE_CHAIN_RPC_URL || 'https://rpc.mantle.xyz',
    },
    gasToken: {
      name: 'Mantle',
      symbol: 'MNT',
      decimals: 18,
      address: addresses.MNT,
      logoURI: IconMANTLELogo,
    },
  },
  defaultTokenPair: [addresses.MNT, addresses.USDC],
  popularPairs: [
    [addresses.MNT, addresses.USDC],
    [addresses.MNT, addresses.USDT],
    [addresses.MNT, addresses.DAI],
    [addresses.MNT, addresses.WBTC],
    // [addresses.BNT, addresses.USDC],
    // [addresses.BNT, addresses.USDT],
    // [addresses.BNT, addresses.DAI],
    // [addresses.BNT, addresses.MNT],
    // [addresses.BNT, addresses.WBTC],
    [addresses.WBTC, addresses.USDC],
    [addresses.WBTC, addresses.USDT],
    [addresses.WBTC, addresses.DAI],
    [addresses.WBTC, addresses.MNT],
    [addresses.USDT, addresses.USDC],
    [addresses.USDC, addresses.USDT],
    [addresses.USDT, addresses.DAI],
    [addresses.USDC, addresses.DAI],
    [addresses.DAI, addresses.USDC],
    [addresses.DAI, addresses.USDT],
    // [addresses.SHIB, addresses.USDT],
    // [addresses.SHIB, addresses.USDC],
    // [addresses.SHIB, addresses.DAI],
    // [addresses.SHIB, addresses.ETH],
  ],
  popularTokens: {
    base: [
      addresses.MNT,
      addresses.WMNT,
      // addresses.ZERO,
      addresses.USDT,
      addresses.USDC,
      // addresses.DAI,
      // addresses.WBTC,
      addresses.PUFF,
      // addresses.MUTO,
      addresses.LEND,
      addresses.USDY,
      // addresses.MUSD,
      // addresses.LUSD,
      addresses.AXLUSDC,
      addresses.KTC,
    ],
    quote: [
      // addresses.DAI,
      addresses.USDC,
      addresses.USDT,
      addresses.MNT,
      // addresses.WBTC,
    ],
  },
  addresses: {
    tokens: addresses,
    carbon: {
      carbonController: '0x04FBC7f949326fFf7Fe4D6aE96BAfa3D8e8A8c0a',
      voucher: '0x6Ed7042cC1eF691ef64D8dCF3764B004d62590dD',
    },
  },
  utils: {
    multicall3: {
      address: '0xb55cc6B5B402437b66c13c0CEd0EF367aa7c26da',
      blockCreated: 2638,
    },
    ensRegistry: {
      address: '0x',
    },
    ensUniversalResolver: {
      address: '0x',
      blockCreated: 0,
    },
  },
  tokenListOverride: [
    {
      name: 'Wrapped MANTLE',
      symbol: 'WMNT',
      decimals: 18,
      address: addresses.WMNT,
      logoURI: IconMANTLELogo,
    },
  ],
  tokenLists: [
    // Bancor
    // {
    //   uri: 'https://d1wmp5nysbq9xl.cloudfront.net/ethereum/tokens.json',
    // },
    // CoinGecko
    {
      uri: 'https://tokens.coingecko.com/mantle/all.json',
    },
  ],
  tenderly: {
    nativeTokenDonorAccount: '',
    faucetAmount: 1000,
    faucetTokens: [],
  },
  sdk: {
    cacheTTL: ONE_HOUR_IN_MS,
  },
};
