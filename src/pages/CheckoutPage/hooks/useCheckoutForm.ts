import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import useCartStore from '@/store/useCartStore';
import useAuthStore from '@/store/useAuthStore';
import { ordersAPI } from '@/services/supabase/orders/api';
import { routePaths } from '@/router/routePaths';

const checkoutSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  companyName: z.string().optional(),
  address: z.string().nonempty('Street address is required'),
  country: z.string().nonempty('Country is required'),
  state: z.string().nonempty('State is required'),
  zipCode: z.string().nonempty('Zip code is required'),
  email: z.email('Invalid email address'),
  phone: z.string().nonempty('Phone number is required'),
  shipDifferentAddress: z.boolean(),
  orderNotes: z.string().optional(),
  paymentMethod: z.enum(['cod', 'paypal', 'amazon']),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const useCheckoutForm = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const user = useAuthStore(state => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      address: '',
      country: '',
      state: '',
      zipCode: '',
      email: '',
      phone: '',
      shipDifferentAddress: false,
      orderNotes: '',
      paymentMethod: 'cod',
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (values: CheckoutFormValues) => {
      if (!user) throw new Error('User must be logged in to create an order');
      if (items.length === 0) throw new Error('Cart is empty');

      const subtotal = items.reduce((acc, item) => {
        const price = item.product.salePrice || item.product.price;
        return acc + price * item.quantity;
      }, 0);

      const shippingCost = 0;
      const total = subtotal + shippingCost;

      const payload = {
        userId: user.id,
        subtotal,
        shippingCost,
        total,
        paymentMethod: values.paymentMethod,
        notes: values.orderNotes,
        billing: {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          country: values.country,
          state: values.state,
          zipCode: values.zipCode,
          email: values.email,
          phone: values.phone,
        },
        shipping: {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          country: values.country,
          state: values.state,
          zipCode: values.zipCode,
          email: values.email,
          phone: values.phone,
        },
        items: items.map(item => {
          const price = item.product.salePrice || item.product.price;
          return {
            productId: item.product.id,
            productName: item.product.name,
            productImage: item.product.imageUrl || null,
            price: price,
            quantity: item.quantity,
            subtotal: price * item.quantity,
          };
        }),
      };

      const { data: order, error } = await ordersAPI.createOrder(payload);

      if (error || !order) {
        throw new Error(error?.message || 'Failed to create order');
      }

      return order;
    },
    onSuccess: order => {
      clearCart();
      navigate(routePaths.ACCOUNT.ORDER_HISTORY.ORDER_DETAILS.path(order.id));
    },
    onError: error => {
      console.error('Error creating order:', error);
    },
  });

  const onSubmit = handleSubmit(values => {
    createOrderMutation.mutate(values);
  });

  return {
    register,
    errors,
    onSubmit,
    isPending: createOrderMutation.isPending,
    error: createOrderMutation.error,
  };
};
