import LogoFusionx from 'assets/logos/fusionx.svg';

export const CarbonLogoLoading = ({
  className = '',
}: {
  className?: string;
}) => {
  return (
    <div
      className={className}
      style={{ justifyContent: 'center', display: 'flex' }}
    >
      <img
        src={LogoFusionx}
        style={{
          strokeDasharray: 5000,
          strokeDashoffset: 0,
          animation: 'carbonLoading 1.5s linear infinite',
        }}
      />
    </div>
  );
};
