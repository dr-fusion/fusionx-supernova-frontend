import { useSearch } from '@tanstack/react-router';
import { useTokens } from 'hooks/useTokens';
import { StrategyDirection, StrategySettings } from 'libs/routing';
import { CreateOrder } from 'components/strategies/create/CreateOrder';
import { TabsMenu } from 'components/common/tabs/TabsMenu';
import { TabsMenuButton } from 'components/common/tabs/TabsMenuButton';
import { useMarketPrice } from 'hooks/useMarketPrice';
import { CreateLayout } from 'components/strategies/create/CreateLayout';
import { CreateForm } from 'components/strategies/create/CreateForm';
import { OrderBlock } from 'components/strategies/common/types';
import {
  emptyOrder,
  outSideMarketWarning,
} from 'components/strategies/common/utils';
import { useSetDisposableOrder } from 'components/strategies/common/useSetOrder';

export interface CreateDisposableStrategySearch {
  base: string;
  quote: string;
  direction: StrategyDirection;
  settings: StrategySettings;
  min?: string;
  max?: string;
  budget?: string;
}

const url = '/strategies/create/disposable';
export const CreateDisposableStrategyPage = () => {
  const { getTokenById } = useTokens();
  const search = useSearch({ from: url });
  const base = getTokenById(search.base);
  const quote = getTokenById(search.quote);
  const marketPrice = useMarketPrice({ base, quote });
  const { setOrder, setDirection } = useSetDisposableOrder(url);

  const buy = search.direction !== 'sell';
  const order: OrderBlock = {
    min: search.min ?? '',
    max: search.max ?? '',
    budget: search.budget ?? '',
    settings: search.settings ?? 'limit',
  };

  // Warnings
  const outSideMarket = outSideMarketWarning({
    base,
    marketPrice,
    min: search.min,
    max: search.max,
    buy: search.direction !== 'sell',
  });

  return (
    <CreateLayout base={base} quote={quote}>
      <CreateForm
        type="disposable"
        base={base!}
        quote={quote!}
        order0={buy ? order : emptyOrder()}
        order1={buy ? emptyOrder() : order}
      >
        <CreateOrder
          type="disposable"
          base={base!}
          quote={quote!}
          buy={buy}
          order={order}
          setOrder={setOrder}
          warnings={[outSideMarket]}
          settings={
            <TabsMenu>
              <TabsMenuButton
                onClick={() => setDirection('buy')}
                isActive={buy}
                data-testid="tab-buy"
              >
                Buy
              </TabsMenuButton>
              <TabsMenuButton
                onClick={() => setDirection('sell')}
                isActive={!buy}
                data-testid="tab-sell"
              >
                Sell
              </TabsMenuButton>
            </TabsMenu>
          }
        />
      </CreateForm>
    </CreateLayout>
  );
};
