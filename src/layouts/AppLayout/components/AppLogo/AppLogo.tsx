import AppLogoIcon from '@/icons/AppLogoIcon';

const AppLogo = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <AppLogoIcon className="text-primary w-8 h-8" />
      <span className="text-green-gray-900 font-medium leading-[38px] tracking-[-3%] text-[32px]">
        PureHarvest
      </span>
    </div>
  );
};
export default AppLogo;
