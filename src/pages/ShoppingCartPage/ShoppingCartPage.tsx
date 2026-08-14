import { sectionContainer } from '@/constants/global.styles';
import ShoppingCartTable from './components/ShoppingCartTable/ShoppingCartTable';
import { classNames } from '@/utils';
import CartTotals from './components/CartTotals/CartTotals';

const ShoppingCartPage = () => {
  return (
    <div className={classNames(sectionContainer, 'py-8')}>
      <h3 className="font-semibold mb-4 text-3xl text-center">My Shopping Cart</h3>
      <div className="flex gap-6 flex-col xl:flex-row">
        <ShoppingCartTable />
        <CartTotals />
      </div>
    </div>
  );
};
export default ShoppingCartPage;
