// router/router.tsx

import { createBrowserRouter, redirect, type RouteObject } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout/AppLayout';
import GuestRoute from '@/layouts/GuestRoute/GuestRoute';
import ProtectedRoute from '@/layouts/ProtectedRoute/ProtectedRoute';
// import RootErrorBoundary from '@/components/RootErrorBoundary';
// import NotFound from '@/components/NotFound';
import { routePaths } from '@/router/routePaths';
import { lazy } from 'react';
import SignUp from '@/pages/AuthPages/SignUp/SignUp';
import SignIn from '@/pages/AuthPages/SignIn/SignIn';
import DashboardPage from '@/pages/AccountPages/DashboardPage/DashboardPage';
import AccountLayout from '@/pages/AccountPages/layouts/AccountLayout';
import OrderHistoryPage from '@/pages/AccountPages/OrderHistoryPage/OrderHistoryPage';
import AuthCallback from '@/pages/AuthPages/AuthCallback/AuthCallback';
import OrderDetailsPage from '@/pages/AccountPages/OrderDetailsPage/OrderDetailsPage';
import SettingsPage from '@/pages/AccountPages/SettingsPage/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import FAQs from '@/pages/FAQsPage/FAQsPage';
import ContactUsPage from '@/pages/ContactUsPage/ContactUsPage';
import AboutUsPage from '@/pages/AboutUsPage/components/AboutUsPage';
import ScrollToTop from './ScrollToTop';
// Lazy loaded pages
const HomePage = lazy(() => import('@/pages/Home/HomePage'));

const routes: RouteObject[] = [
  {
    element: (
      <ScrollToTop>
        <AppLayout />
      </ScrollToTop>
    ),
    // errorElement: <RootErrorBoundary />,
    children: [
      // ========================
      // Public (Anyone)
      // ========================
      {
        path: routePaths.HOME,
        handle: { breadcrumb: 'Home' },
        element: <HomePage />,
      },
      {
        path: routePaths.SHOP.ROOT,
        handle: { breadcrumb: 'Shop' },
        children: [
          {
            index: true,
            element: <div>Shop</div>,
          },
          {
            path: routePaths.SHOP.ITEM_DETAILS.pathName,
            handle: {
              breadcrumb: (params: Record<string, string>) => params.itemId,
            },
            element: <div>Item Details</div>,
          },
        ],
      },
      {
        path: routePaths.SHOPPING_CART.ROOT,
        handle: { breadcrumb: 'Shopping Cart' },
        children: [
          {
            index: true,
            element: <div>Shopping Cart</div>,
          },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: routePaths.SHOPPING_CART.CHECKOUT.pathName,
                handle: { breadcrumb: 'Checkout' },
                element: <div>Checkout</div>,
              },
            ],
          },
        ],
      },
      {
        path: routePaths.WISHLIST,
        handle: { breadcrumb: 'Wishlist' },
        element: <div>Wishlist</div>,
      },
      {
        path: routePaths.BLOGS.ROOT,
        handle: { breadcrumb: 'Blogs' },
        children: [
          {
            index: true,
            element: <div>Blogs</div>,
          },
          {
            path: routePaths.BLOGS.BLOG_DETAILS.pathName,
            handle: {
              breadcrumb: (params: Record<string, string>) => params.blogId,
            },
            element: <div>Blog Details</div>,
          },
        ],
      },
      {
        path: routePaths.ABOUT,
        handle: { breadcrumb: 'About' },
        element: <AboutUsPage />,
      },
      {
        path: routePaths.FAQS,
        handle: { breadcrumb: 'FAQs' },
        element: <FAQs />,
      },
      {
        path: routePaths.CONTACT_US,
        handle: { breadcrumb: 'Contact Us' },
        element: <ContactUsPage />,
      },
      {
        path: routePaths.ACCOUNT.AUTH_CALLBACK,
        element: <AuthCallback />,
      },
      // ========================
      // Guest Only
      // ========================
      {
        element: <GuestRoute />,
        children: [
          {
            path: routePaths.ACCOUNT.SIGNIN,
            handle: { breadcrumb: 'Sign In' },
            element: <SignIn />,
          },
          {
            path: routePaths.ACCOUNT.SIGNUP,
            handle: { breadcrumb: 'Sign Up' },
            element: <SignUp />,
          },
        ],
      },

      // ========================
      // Protected (Authenticated Only)
      // ========================
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: routePaths.ACCOUNT.ROOT,
            handle: { breadcrumb: 'Account' },
            element: <AccountLayout />,
            children: [
              {
                index: true,
                loader: () => redirect(routePaths.ACCOUNT.DASHBOARD.path),
              },
              {
                path: routePaths.ACCOUNT.DASHBOARD.pathName,
                handle: { breadcrumb: 'Dashboard' },
                element: <DashboardPage />,
              },
              {
                path: routePaths.ACCOUNT.ORDER_HISTORY.pathName,
                handle: { breadcrumb: 'Order History' },
                children: [
                  {
                    index: true,
                    element: <OrderHistoryPage />,
                  },
                  {
                    path: routePaths.ACCOUNT.ORDER_HISTORY.ORDER_DETAILS.pathName,
                    handle: {
                      breadcrumb: (params: Record<string, string>) => `Order #${params.orderId}`,
                    },
                    element: <OrderDetailsPage />,
                  },
                ],
              },
              {
                path: routePaths.ACCOUNT.SETTINGS.pathName,
                handle: { breadcrumb: 'Settings' },
                element: <SettingsPage />,
              },
            ],
          },
        ],
      },

      // ========================
      // 404
      // ========================
      {
        path: '*',
        handle: { breadcrumb: 'Not Found' },
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
