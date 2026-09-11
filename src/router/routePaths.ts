export const routePaths = {
  HOME: '/',

  SHOP: {
    ROOT: '/shop',
    ITEM_DETAILS: {
      path: (id: string) => `/shop/${id}`,
      pathName: ':id',
    },
  },

  SHOPPING_CART: {
    ROOT: '/shopping-cart',
    CHECKOUT: {
      path: '/shopping-cart/checkout',
      pathName: 'checkout',
    },
  },

  WISHLIST: '/wishlist',

  ACCOUNT: {
    ROOT: '/account',
    DASHBOARD: {
      path: '/account/dashboard',
      pathName: 'dashboard',
    },
    ORDER_HISTORY: {
      path: '/account/order-history',
      pathName: 'order-history',
      ORDER_DETAILS: {
        path: (orderId: string) => `/account/order-history/${orderId}`,
        pathName: ':orderId',
      },
    },
    SETTINGS: {
      path: '/account/settings',
      pathName: 'settings',
    },
    // Not nested under /account in the router tree (Guest routes)
    SIGNIN: '/account/signin',
    SIGNUP: '/account/signup',
    AUTH_CALLBACK: '/account/auth/callback',
  },

  BLOGS: {
    ROOT: '/blogs',
    BLOG_DETAILS: {
      path: (blogId: string) => `/blogs/${blogId}`,
      pathName: ':blogId',
    },
  },

  ABOUT: '/about',
  FAQS: '/faqs',
  CONTACT_US: '/contact-us',
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFlattenedRoutes = (routesObj: Record<string, any>): string[] => {
  const paths: string[] = [];
  for (const key in routesObj) {
    const value = routesObj[key];
    if (typeof value === 'string' && value.startsWith('/')) {
      paths.push(value);
    } else if (typeof value === 'object' && value !== null) {
      if (typeof value.path === 'function' && typeof value.pathName === 'string') {
        paths.push(value.path(value.pathName));
      }
      paths.push(...getFlattenedRoutes(value));
    }
  }
  return Array.from(new Set(paths));
};

export const allRoutesArray: string[] = getFlattenedRoutes(routePaths);

export const authPaths: string[] = [
  routePaths.ACCOUNT.SIGNIN,
  routePaths.ACCOUNT.SIGNUP,
  routePaths.ACCOUNT.AUTH_CALLBACK,
] as const;
