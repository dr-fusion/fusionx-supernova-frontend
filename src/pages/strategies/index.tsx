import { Button } from 'components/Button';
import { Page } from 'components/Page';
import { SearchInput } from 'components/SearchInput';
import { StrategyBlock } from 'components/StrategyBlock';
import { StrategyBlockCreate } from 'components/StrategyBlock/create';
import { m, mListVariant } from 'motion';
import { useGetUserStrategies } from 'queries';
import { FC, useMemo, useState } from 'react';
import { ReactComponent as IconArrowDown } from 'assets/icons/arrowDown.svg';
import { ReactComponent as IconCheck } from 'assets/icons/check.svg';
import { Link, PathNames } from 'routing';
import { useWeb3 } from 'web3';
import { WalletConnect } from 'components/WalletConnect';
import { DropdownMenu } from 'components/DropdownMenu';

export const StrategiesPage = () => {
  const { user } = useWeb3();

  return user ? <StrategyContent /> : <WalletConnect />;
};

const StrategyContent = () => {
  const strategies = useGetUserStrategies();
  const [search, setSearch] = useState('');

  const filteredStrategies = useMemo(() => {
    return strategies.data?.filter(
      (strategy) =>
        strategy.order0.token.symbol
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        strategy.order1.token.symbol
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search, strategies.data]);

  return strategies.isLoading ? (
    <StrategyLoadingPage />
  ) : filteredStrategies && strategies.data && strategies.data.length > 0 ? (
    <Page
      title={'Strategies'}
      widget={<StrategyPageTitleWidget search={search} setSearch={setSearch} />}
    >
      <m.div
        className={'grid grid-cols-1 gap-25 md:grid-cols-3'}
        variants={mListVariant}
        initial={'hidden'}
        animate={'visible'}
      >
        {filteredStrategies.map((s) => (
          <StrategyBlock key={s.id} strategy={s} />
        ))}

        <StrategyBlockCreate />
      </m.div>
    </Page>
  ) : (
    <CreateFirstStrategy />
  );
};

const StrategyLoadingPage = () => {
  return (
    <Page title={'Strategies'}>
      <m.div
        className={'grid grid-cols-1 gap-25 md:grid-cols-3'}
        variants={mListVariant}
        initial={'hidden'}
        animate={'visible'}
      >
        {[...Array(3)].map(() => (
          <div className="loading-skeleton h-[665px] w-full" />
        ))}
      </m.div>
    </Page>
  );
};

const StrategyPageTitleWidget: FC<{
  search: string;
  setSearch: (value: string) => void;
}> = ({ search, setSearch }) => {
  return (
    <div className="flex items-center gap-20">
      <SearchInput
        value={search}
        setValue={setSearch}
        className="h-40 w-full"
      />
      <FilterSort />
      <Link to={PathNames.createStrategy}>
        <Button variant="secondary">Create Strategy</Button>
      </Link>
    </div>
  );
};

const CreateFirstStrategy = () => {
  return (
    <div className="h-screen p-20">
      <StrategyBlockCreate
        title="Create Your First Strategy"
        className="w-[270px] gap-[32px] text-center text-36"
      />
    </div>
  );
};

const FilterSort = () => {
  return (
    <DropdownMenu
      button={
        <Button variant="tertiary" className="flex items-center gap-10">
          Filter & Sort <IconArrowDown className="w-14" />
        </Button>
      }
    >
      <div className="grid w-[300px] gap-20 p-10">
        <div className="text-secondary text-20">Sort By</div>
        <button className="flex items-center justify-between">
          Recent Trade Activity
          {false && <IconCheck />}
        </button>
        <button className="flex items-center justify-between">
          Largest Balance (USD)
          {false && <IconCheck />}
        </button>
        <button className="flex items-center justify-between">
          Smallest Balance (USD)
          {false && <IconCheck />}
        </button>
        <button className="flex items-center justify-between">
          Recently Created
          {false && <IconCheck />}
        </button>
        <button className="flex items-center justify-between">
          Oldest Created
          {false && <IconCheck />}
        </button>
        <hr className="border-2 border-silver dark:border-emphasis" />
        <button className="text-secondary">View</button>
        <button className="flex items-center justify-between">
          All
          {false && <IconCheck />}
        </button>
        <button className="flex items-center justify-between">
          Active
          {false && <IconCheck />}
        </button>
        <button className="flex items-center justify-between">
          Off curve
          {false && <IconCheck />}
        </button>
      </div>
    </DropdownMenu>
  );
};
