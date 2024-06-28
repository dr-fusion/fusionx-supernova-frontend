import { ChangeEvent, FC, FocusEvent, useId, useRef } from 'react';
import { Token } from 'libs/tokens';
import { formatNumber, prettifyNumber, sanitizeNumber } from 'utils/helpers';
import { SafeDecimal } from 'libs/safedecimal';
import { decimalNumberValidationRegex } from 'utils/inputsValidations';
import { TokenLogo } from 'components/common/imager/Imager';
import { useFiatCurrency } from 'hooks/useFiatCurrency';
import { useWagmi } from 'libs/wagmi';
import { Warning } from 'components/common/WarningMessageWithIcon';
import { Tooltip } from 'components/common/tooltip/Tooltip';

export type BudgetAction = 'withdraw' | 'deposit';

interface Props {
  editType?: BudgetAction;
  token: Token;
  id?: string;
  className?: string;
  value?: string;
  max?: string;
  maxIsLoading?: boolean;
  placeholder?: string;
  title?: string;
  titleTooltip?: string;
  disabled?: boolean;
  error?: string;
  warning?: string;
  'data-testid'?: string;
  onChange: (value: string) => void;
}

export const InputBudget: FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const { user } = useWagmi();
  const {
    className,
    token,
    editType = 'deposit',
    value = '',
    max = '',
    maxIsLoading,
    placeholder = 'Enter Amount',
    disabled,
    error,
    warning,
    title,
    titleTooltip,
  } = props;
  const id = props.id ?? inputId;
  const { getFiatValue, selectedFiatCurrency: currentCurrency } =
    useFiatCurrency(token);
  const fiatValue = getFiatValue(value ?? '0', true);

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value);
    if (formatted !== e.target.value) props.onChange(formatted);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeNumber(e.target.value, token.decimals);
    props.onChange(sanitized);
  };

  const setMax = () => {
    if (!max || max === value) return;
    const maxBudget = new SafeDecimal(max).toFixed(token.decimals);
    props.onChange(maxBudget);
  };

  return (
    <div className="flex flex-col gap-16">
      {title && (
        <label htmlFor={id} className="text-14 font-weight-500 flex">
          <Tooltip element={titleTooltip}>
            <span className="text-white/80">{title}</span>
          </Tooltip>
        </label>
      )}
      <div
        className={`
          flex cursor-text flex-col gap-8 rounded border border-black bg-black p-16
          focus-within:border-white/50
          ${error ? '!border-error/50' : ''}
          ${className}
        `}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center justify-between">
          <input
            id={id}
            type="text"
            pattern={decimalNumberValidationRegex}
            inputMode="decimal"
            ref={inputRef}
            value={value}
            size={1}
            placeholder={placeholder}
            className={`
              text-18 font-weight-500 grow text-ellipsis bg-transparent focus:outline-none
              ${error ? 'text-error' : ''}
              ${disabled ? 'text-white/40' : ''}
              ${disabled ? 'cursor-not-allowed' : ''}
            `}
            onFocus={(e) => e.target.select()}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            data-testid={props['data-testid']}
          />
          <div className="bg-background-800 flex items-center gap-6 rounded-[20px] px-8 py-6">
            <TokenLogo token={token} size={20} />
            <span className="font-weight-500">{token.symbol}</span>
          </div>
        </div>
        <div className="text-12 font-weight-500 flex min-h-[16px] flex-wrap items-center justify-between gap-10 font-mono">
          <p className="flex items-center gap-5 break-all text-white/60">
            {fiatValue.gt(0) && prettifyNumber(fiatValue, { currentCurrency })}
          </p>
          {user && max && !maxIsLoading && (
            <button
              disabled={disabled}
              type="button"
              onClick={setMax}
              className="group/budget-input flex items-center gap-4"
            >
              <span className="text-white/60">
                {editType === 'deposit' ? 'Wallet:' : 'Allocated:'}
              </span>
              <span className="text-white">{prettifyNumber(max)}</span>
              <span
                className={
                  disabled
                    ? 'text-primary/40'
                    : 'text-primary group-hover/budget-input:text-white'
                }
              >
                MAX
              </span>
            </button>
          )}
          {user && max && maxIsLoading && (
            <span className="loading-message">Loading</span>
          )}
        </div>
      </div>
      {error && <Warning htmlFor={id} message={error} isError />}
      {!error && warning && <Warning htmlFor={id} message={warning} />}
    </div>
  );
};
