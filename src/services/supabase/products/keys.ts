export const productKeys = {
  all: () => ['products'] as const,
  lists: () => [...productKeys.all(), 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...productKeys.lists(), filters] as const,
  detail: (slug: string) => [...productKeys.all(), 'detail', slug] as const,
  categories: () => [...productKeys.all(), 'categories'] as const,
  tags: () => [...productKeys.all(), 'tags'] as const,
  featured: () => [...productKeys.all(), 'featured'] as const,
  related: (productId: string) => [...productKeys.all(), 'related', productId] as const,
};
