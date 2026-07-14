export const wishlistKeys = {
  all: () => ['wishlists'] as const,
  lists: () => [...wishlistKeys.all(), 'list'] as const,
  list: (userId: string) => [...wishlistKeys.lists(), userId] as const,
  detail: (userId: string, productId: string) => [...wishlistKeys.all(), 'detail', userId, productId] as const,
};
