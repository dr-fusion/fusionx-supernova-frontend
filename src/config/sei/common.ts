import { AppConfig } from 'config/types';
import IconSeiLogo from 'assets/logos/seilogo.svg';
import { tokenListParser } from 'config/sei/utils';

const addresses = {
  SEI: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  ZERO: '0x0000000000000000000000000000000000000000',
  WSEI: '0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7',
  USDC: '0x3894085Ef7Ff0f0aeDf52E2A2704928d1Ec074F1',
  USDT: '0xB75D0B03c06A926e488e2659DF1A861F860bD3d1',
};

export const commonConfig: AppConfig = {
  mode: 'development',
  appName: 'Carbon DeFi',
  appUrl: 'https://sei.carbondefi.xyz',
  carbonApi: 'https://sei-api.carbondefi.xyz/v1/',
  selectedConnectors: ['MetaMask', 'Coinbase Wallet', 'Safe'],
  blockedConnectors: ['Seif', 'Tailwind', 'Compass Wallet'],
  walletConnectProjectId: '',
  isSimulatorEnabled: false,
  policiesLastUpdated: '27 May, 2024',
  network: {
    name: 'Sei Network',
    logoUrl: IconSeiLogo,
    chainId: 1329,
    blockExplorer: { name: 'Seitrace', url: 'https://seitrace.com' },
    rpc: {
      url: import.meta.env.VITE_CHAIN_RPC_URL || 'https://evm-rpc.sei-apis.com',
      headers: {
        'x-apikey': import.meta.env.VITE_CHAIN_RPC_KEY || '',
      },
    },
    gasToken: {
      name: 'SEI',
      symbol: 'SEI',
      decimals: 18,
      address: addresses.SEI,
      logoURI: 'https://cdn.sei.io/assets/Sei_Symbol_Gradient.svg',
    },
  },
  sdk: {
    cacheTTL: 0,
  },
  defaultTokenPair: [addresses.SEI, addresses.WSEI],
  popularPairs: [
    [addresses.SEI, addresses.WSEI],
    [addresses.SEI, addresses.USDC],
    [addresses.SEI, addresses.USDT],
  ],
  popularTokens: {
    base: [addresses.SEI, addresses.WSEI, addresses.USDT, addresses.USDC],
    quote: [addresses.SEI, addresses.WSEI, addresses.USDT, addresses.USDC],
  },
  addresses: {
    tokens: addresses,
    carbon: {
      carbonController: '0xe4816658ad10bF215053C533cceAe3f59e1f1087',
      voucher: '0xA4682A2A5Fe02feFF8Bd200240A41AD0E6EaF8d5',
    },
  },
  utils: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 14353601,
    },
  },
  tokenListOverride: [
    {
      name: 'WSEI',
      symbol: 'WSEI',
      decimals: 18,
      address: addresses.WSEI,
      logoURI: 'https://cdn.sei.io/assets/Sei_Symbol_Gradient.svg',
    },
  ],
  tokenLists: [
    {
      uri: 'https://raw.githubusercontent.com/Sei-Public-Goods/sei-assetlist/main/assetlist.json',
      parser: tokenListParser('pacific-1'),
    },
  ],
  tenderly: {
    nativeTokenDonorAccount: '0x3a7AB16485770c21B7543058De545E986284d0D3',
    faucetAmount: 1000,
    faucetTokens: [
      {
        donorAccount: '0x029dAb7D8270ab5120bEE56f7D8214e9DB4F2389',
        tokenContract: addresses.WSEI,
        decimals: 18,
        symbol: 'WSEI',
      },
      {
        donorAccount: '0x946a1a3Dacbc7A7Bb2C7dF0b87195d6092f7238B',
        tokenContract: addresses.USDC,
        decimals: 6,
        symbol: 'USDC',
      },
      {
        donorAccount: '0x0eba0a13Ca36AA4784aE6960a331034A7dE91EF7',
        tokenContract: addresses.USDT,
        decimals: 6,
        symbol: 'USDT',
      },
    ],
  },
};
