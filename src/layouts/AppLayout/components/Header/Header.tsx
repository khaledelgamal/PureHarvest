import { sectionContainer } from '@/constants/global.styles';
import TobBar from './components/TopBar/TobBar';

const Header = () => {
  return (
    <div className={`py-3 bg-gray-800 text-gray-300`}>
      <div className={sectionContainer}>
        <TobBar />
        {/* <MainHeader /> */}
        {/* <Navbar /> */}
      </div>
    </div>
  );
};
export default Header;
