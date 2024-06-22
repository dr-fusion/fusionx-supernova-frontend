import { FC, memo } from 'react';
import { Copyright } from './copyrights';
import { Widget } from './widget';
import { Token } from 'libs/tokens';
import { pairsToExchangeMapping } from 'config/utils';

export type TradingviewChartProps = {
  base: Token | undefined;
  quote: Token | undefined;
};

export const TradingviewChart: FC<TradingviewChartProps> = memo(
  ({ base, quote }) => {
    // we can force WETH for ETH because it's duplicated in pairsToExchangeMapping
    const baseSymbol = base?.symbol === 'WMNT' ? 'MNT' : base?.symbol;
    const quoteSymbol = quote?.symbol === 'WMNT' ? 'MNT' : quote?.symbol;
    const symbol =
      pairsToExchangeMapping[`${baseSymbol}${quoteSymbol}`] ||
      `${baseSymbol}${quoteSymbol}`;

    return (
      <div className="flex flex-col">
        <Widget symbol={symbol} />
        <Copyright symbol={symbol} />
      </div>
    );
  }
);
