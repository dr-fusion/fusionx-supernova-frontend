import { Outlet, useSearch } from '@tanstack/react-router';
import { ActivityProvider } from 'components/activity/ActivityProvider';
import { ActivitySection } from 'components/activity/ActivitySection';
import { TradeExplorerTab } from 'components/trade/TradeExplorerTabs';
import { TradeActivitySearch } from 'libs/routing/routes/trade';

export const TradeActivity = () => {
  const { base, quote } = useSearch({ strict: false }) as TradeActivitySearch;
  const params = { token0: base, token1: quote };
  return (
    <>
      <Outlet />
      <section
        aria-labelledby="activity-tab"
        className="col-span-2 mx-auto grid w-full max-w-[1220px] gap-20"
      >
        <TradeExplorerTab current="activity" />
        <ActivityProvider params={params}>
          <ActivitySection filters={['ids']} />
        </ActivityProvider>
      </section>
    </>
  );
};
