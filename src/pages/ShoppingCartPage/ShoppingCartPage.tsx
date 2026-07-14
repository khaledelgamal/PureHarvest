import { sectionContainer } from '@/constants/global.styles';
import ShoppingCartTable from './components/ShoppingCartTable/ShoppingCartTable';
import { classNames } from '@/utils';

const ShoppingCartPage = () => {
  return (
    <div className={classNames(sectionContainer, 'py-8')}>
      <h3 className="font-semibold mb-4 text-3xl text-center">My Shopping Cart</h3>

      <ShoppingCartTable />
    </div>
  );
};
export default ShoppingCartPage;
