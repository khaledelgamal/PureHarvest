export const routePaths = {
  HOME: '/',

  SHOP: {
    ROOT: '/shop',
    ITEM_DETAILS: {
      path: (itemId: string) => `/shop/${itemId}`,
      pathName: ':itemId',
    },
  },

  SHOPPING_CART: {
    ROOT: '/shopping-Cart',
    CHECKOUT: {
      path: '/shopping-Cart/checkout',
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
