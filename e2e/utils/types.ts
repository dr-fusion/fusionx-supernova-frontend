export const debugTokens = {
  BNB: '0x418D75f65a02b3D53B2418FB8E1fe493759c7605',
  BNT: '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C',
  DAI: '0xB38E748dbCe79849b8298A1D206C8374EFc16DA7',
  ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  MATIC: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
  SHIB: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
  UNI: '0x2730d6FdC86C95a74253BefFaA8306B40feDecbb',
  USDT: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE',
  USDC: '0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9',
  WBTC: '0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2',
};

export type StrategyCase =
  | 'create'
  | 'withdraw'
  | 'delete'
  | 'deposit'
  | 'duplicate'
  | 'editPrices'
  | 'pause'
  | 'renew'
  | 'undercut'
  | 'withdraw';
export type DebugTokens = keyof typeof debugTokens;

export type TokenPair = `${DebugTokens}->${DebugTokens}`;

export type Setting = 'limit' | 'range';
export type Direction = 'buy' | 'sell';

export interface MinMax {
  min: string;
  max: string;
}
export interface RangeOrder extends MinMax {
  budget: string;
}

export interface LimitOrder {
  price: string;
  budget: string;
}

export type TestCase<I, O> = {
  input: I;
  output: O;
};
