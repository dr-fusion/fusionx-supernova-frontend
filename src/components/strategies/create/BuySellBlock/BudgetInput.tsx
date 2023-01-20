import { Imager } from 'components/common/imager/Imager';
import { ChangeEvent, FC } from 'react';
import { Token } from 'libs/tokens';
import { prettifyNumber, reduceETH, sanitizeNumberInput } from 'utils/helpers';

export const BudgetInput: FC<{
  budget: string;
  setBudget: (value: string) => void;
  token: Token;
  balance?: string;
  isBalanceLoading: boolean;
  setBudgetError: (error: string) => void;
  error?: string;
}> = ({
  budget,
  setBudget,
  token,
  balance,
  isBalanceLoading,
  setBudgetError,
  error,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeNumberInput(e.target.value, token.decimals);
    setBudget(sanitized);
  };

  return (
    <div
      className={`${
        error && 'border border-red text-red'
      } bg-body rounded-16 p-16`}
    >
      <div className={'mb-8 flex items-center gap-10'}>
        <div
          className={
            'bg-secondary flex flex-none items-center gap-6 rounded-full p-6 pr-10 text-white'
          }
        >
          <Imager
            alt={'Token'}
            src={token.logoURI}
            className={'h-30 w-30 rounded-full'}
          />
          {token.symbol}
        </div>
        <input
          value={budget}
          size={1}
          onChange={handleChange}
          onBlur={() =>
            setBudgetError(
              Number(budget) > Number(balance) ? 'Insufficient Balance' : ''
            )
          }
          placeholder={`Budget`}
          className={
            'w-full shrink bg-transparent text-right focus:outline-none'
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() =>
            balance && setBudget(reduceETH(balance, token.address))
          }
          className={'text-secondary flex items-center gap-5 !text-12'}
        >
          Wallet:{' '}
          {isBalanceLoading || !balance ? 'loading' : prettifyNumber(balance)}{' '}
          <div className="text-green">MAX</div>
        </button>
        {error && <div className="text-center text-12 text-red">{error}</div>}
      </div>
    </div>
  );
};
