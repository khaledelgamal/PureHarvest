// router/router.tsx

import { createBrowserRouter, redirect, type RouteObject } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout/AppLayout';
import GuestRoute from '@/layouts/GuestRoute/GuestRoute';
import ProtectedRoute from '@/layouts/ProtectedRoute/ProtectedRoute';
// import RootErrorBoundary from '@/components/RootErrorBoundary';
// import NotFound from '@/components/NotFound';
import { routePaths } from '@/router/routePaths';
import { lazy } from 'react';

// Lazy loaded pages
const HomePage = lazy(() => import('@/pages/Home/HomePage'));

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
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
        element: <div>About</div>,
      },
      {
        path: routePaths.FAQS,
        handle: { breadcrumb: 'FAQs' },
        element: <div>FAQs</div>,
      },
      {
        path: routePaths.CONTACT_US,
        handle: { breadcrumb: 'Contact Us' },
        element: <div>Contact Us</div>,
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
            element: <div>Sign In</div>,
          },
          {
            path: routePaths.ACCOUNT.SIGNUP,
            handle: { breadcrumb: 'Sign Up' },
            element: <div>Sign Up</div>,
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
            children: [
              {
                index: true,
                loader: () => redirect(routePaths.ACCOUNT.DASHBOARD.path),
              },
              {
                path: routePaths.ACCOUNT.DASHBOARD.pathName,
                handle: { breadcrumb: 'Dashboard' },
                element: <div>Dashboard</div>,
              },
              {
                path: routePaths.ACCOUNT.ORDER_HISTORY.pathName,
                handle: { breadcrumb: 'Order History' },
                children: [
                  {
                    index: true,
                    element: <div>Order History</div>,
                  },
                  {
                    path: routePaths.ACCOUNT.ORDER_HISTORY.ORDER_DETAILS.pathName,
                    handle: {
                      breadcrumb: (params: Record<string, string>) => `Order #${params.orderId}`,
                    },
                    element: <div>Order Details</div>,
                  },
                ],
              },
              {
                path: routePaths.ACCOUNT.SETTINGS.pathName,
                handle: { breadcrumb: 'Settings' },
                element: <div>Settings</div>,
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
        element: <>404 Page not found</>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
