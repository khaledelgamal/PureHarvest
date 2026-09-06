import useNavTabs from '../../hooks/useNavTabs';
import DesktopNavbar from './components/DesktopNavbar/DesktopNavbar';

const Navbar = () => {
  const tabs = useNavTabs();

  return (
    <nav className="bg-gray-50 hidden lg:block">
      <DesktopNavbar tabs={tabs} />
    </nav>
  );
};
export default Navbar;
