import { FC, useCallback, useEffect, useState } from 'react';
import { useGetTokenBalance } from 'libs/queries';
import {
  getMaxBuyMin,
  getMinSellMax,
  isMaxBelowMarket,
  isMinAboveMarket,
} from 'components/strategies/overlapping/utils';
import { Tooltip } from 'components/common/tooltip/Tooltip';
import { OverlappingStrategyGraph } from 'components/strategies/overlapping/OverlappingStrategyGraph';
import { OverlappingSpread } from 'components/strategies/overlapping/OverlappingSpread';
import { OverlappingBudget } from 'components/strategies/overlapping/OverlappingBudget';
import { SafeDecimal } from 'libs/safedecimal';
import {
  BudgetDescription,
  BudgetDistribution,
} from 'components/strategies/common/BudgetDistribution';
import { OverlappingAnchor } from 'components/strategies/overlapping/OverlappingAnchor';
import { Token } from 'libs/tokens';
import { m } from 'libs/motion';
import { items } from 'components/strategies/common/variants';
import { OverlappingMarketPrice } from '../overlapping/OverlappingMarketPrice';
import { UserMarketPrice } from '../UserMarketPrice';
import { useWagmi } from 'libs/wagmi';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { CreateOverlappingStrategySearch } from 'pages/strategies/create/overlapping';
import { InputRange } from '../common/InputRange';
import { OverlappingOrder } from 'components/strategies/common/types';

interface Props {
  base: Token;
  quote: Token;
  marketPrice: string;
  order0: OverlappingOrder;
  order1: OverlappingOrder;
  spread: string;
}

type Search = CreateOverlappingStrategySearch;

const url = '/strategies/create/overlapping';
export const CreateOverlapping: FC<Props> = (props) => {
  const { base, quote, order0, order1, marketPrice, spread } = props;
  const navigate = useNavigate({ from: url });
  const { anchor, budget } = useSearch({ from: url });
  const { user } = useWagmi();

  const baseBalance = useGetTokenBalance(base).data;
  const quoteBalance = useGetTokenBalance(quote).data;
  const [touched, setTouched] = useState(false);

  const set = useCallback(
    <T extends keyof Search>(key: T, value: Search[T]) => {
      navigate({
        search: (previous) => ({ ...previous, [key]: value }),
        replace: true,
        resetScroll: false,
      });
    },
    [navigate]
  );

  const aboveMarket = isMinAboveMarket(order0);
  const belowMarket = isMaxBelowMarket(order1);

  // ERROR
  const anchorError = (() => {
    if (touched && !anchor) return 'Please select a token to proceed';
  })();
  const budgetError = (() => {
    if (anchor === 'buy' && quoteBalance && budget) {
      const hasError = new SafeDecimal(budget).gt(quoteBalance);
      if (hasError) return 'Insufficient balance';
    }
    if (anchor === 'sell' && baseBalance && budget) {
      const hasError = new SafeDecimal(budget).gt(baseBalance);
      if (hasError) return 'Insufficient balance';
    }
  })();

  // WARNING
  const priceWarning = (() => {
    if (!aboveMarket && !belowMarket) return;
    return 'Notice: your strategy is “out of the money” and will be traded when the market price moves into your price range.';
  })();

  useEffect(() => {
    if (anchor === 'buy' && aboveMarket) {
      set('anchor', 'sell');
      set('budget', undefined);
    }
    if (anchor === 'sell' && belowMarket) {
      set('anchor', 'buy');
      set('budget', undefined);
    }
  }, [anchor, aboveMarket, belowMarket, set]);

  const setMarketPrice = (price: string) => {
    setTouched(true);
    set('marketPrice', price);
  };

  const setMin = (min: string) => {
    setTouched(true);
    set('min', min);
  };

  const setMax = (max: string) => {
    setTouched(true);
    set('max', max);
  };

  const setSpread = (value: string) => {
    setTouched(true);
    set('spread', value);
  };

  const setAnchorValue = (value: 'buy' | 'sell') => {
    set('budget', undefined);
    set('anchor', value);
  };

  const setBudget = async (value: string) => {
    set('budget', value);
  };

  // Update on buyMin changes
  useEffect(() => {
    if (!order0.min) return;
    const timeout = setTimeout(async () => {
      const minSellMax = getMinSellMax(Number(order0.min), Number(spread));
      if (Number(order1.max) < minSellMax) set('max', minSellMax.toString());
    }, 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order0.min]);

  // Update on sellMax changes
  useEffect(() => {
    if (!order1.max) return;
    const timeout = setTimeout(async () => {
      const maxBuyMin = getMaxBuyMin(Number(order1.max), Number(spread));
      if (Number(order0.min) > maxBuyMin) set('min', maxBuyMin.toString());
    }, 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order1.max]);

  if (!base || !quote) return null;

  return (
    <UserMarketPrice marketPrice={+marketPrice}>
      <m.article
        variants={items}
        key="price-graph"
        className="rounded-10 bg-background-900 flex w-full flex-col gap-16 p-20"
      >
        <header className="flex items-center gap-8">
          <h2 className="text-18 font-weight-500 flex-1">Price Range</h2>
          <OverlappingMarketPrice
            base={base}
            quote={quote}
            marketPrice={marketPrice}
            setMarketPrice={setMarketPrice}
          />
        </header>
        <OverlappingStrategyGraph
          base={base}
          quote={quote}
          order0={order0}
          order1={order1}
          marketPrice={+marketPrice}
          spread={+spread}
          setMin={setMin}
          setMax={setMax}
        />
      </m.article>
      <m.article
        variants={items}
        key="price-range"
        className="rounded-10 bg-background-900 flex w-full flex-col gap-16 p-20"
      >
        <header className="flex items-center gap-8">
          <h3 className="text-18 font-weight-500 flex-1">
            Set Price Range&nbsp;
            <span className="text-white/40">
              ({quote?.symbol} per 1 {base?.symbol})
            </span>
          </h3>
          <Tooltip
            element="Indicate the strategy exact buy and sell prices."
            iconClassName="size-18 text-white/60"
          />
        </header>
        <InputRange
          base={base}
          quote={quote}
          min={order0.min}
          max={order1.max}
          setMin={setMin}
          setMax={setMax}
          minLabel="Min Buy Price"
          maxLabel="Max Sell Price"
          warnings={[priceWarning]}
          isOverlapping
        />
      </m.article>
      <m.article
        variants={items}
        key="spread"
        className="rounded-10 bg-background-900 flex w-full flex-col gap-10 p-20"
      >
        <header className="mb-10 flex items-center gap-8 ">
          <h3 className="text-18 font-weight-500 flex-1">Set Fee Tier</h3>
          <Tooltip
            element="The difference between the highest bidding (Sell) price, and the lowest asking (Buy) price"
            iconClassName="size-18 text-white/60"
          />
        </header>
        <OverlappingSpread
          buyMin={Number(order0.min)}
          sellMax={Number(order1.max)}
          defaultValue={0.05}
          options={[0.01, 0.05, 0.1]}
          spread={spread}
          setSpread={setSpread}
        />
      </m.article>
      <OverlappingAnchor
        base={base}
        quote={quote}
        anchor={anchor}
        setAnchor={setAnchorValue}
        anchorError={anchorError}
        disableBuy={aboveMarket}
        disableSell={belowMarket}
      />
      {anchor && (
        <OverlappingBudget
          base={base}
          quote={quote}
          anchor={anchor}
          editType="deposit"
          budget={budget ?? ''}
          setBudget={setBudget}
          error={budgetError}
        />
      )}
      {anchor && (
        <m.article
          variants={items}
          key="overlapping-distribution"
          id="overlapping-distribution"
          className="rounded-10 bg-background-900 flex w-full flex-col gap-16 p-20"
        >
          <hgroup>
            <h3 className="text-16 font-weight-500 flex items-center gap-8">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-[10px] text-white/60">
                3
              </span>
              Distribution
            </h3>
            <p className="text-14 text-white/80">
              Following the above deposit amount, these are the changes in
              budget allocation
            </p>
          </hgroup>
          <BudgetDistribution
            title="Sell"
            token={base}
            initialBudget="0"
            withdraw="0"
            deposit={budgetError ? '0' : order1.budget}
            balance={baseBalance || '0'}
            isSimulator={!user}
          />
          {!!user && (
            <BudgetDescription
              token={base}
              initialBudget="0"
              withdraw="0"
              deposit={budgetError ? '0' : order1.budget}
              balance={baseBalance || '0'}
            />
          )}
          <BudgetDistribution
            title="Buy"
            token={quote}
            initialBudget="0"
            withdraw="0"
            deposit={budgetError ? '0' : order0.budget}
            balance={quoteBalance || '0'}
            isSimulator={!user}
            buy
          />
          {!!user && (
            <BudgetDescription
              token={quote}
              initialBudget="0"
              withdraw="0"
              deposit={budgetError ? '0' : order0.budget}
              balance={quoteBalance || '0'}
            />
          )}
        </m.article>
      )}
    </UserMarketPrice>
  );
};
