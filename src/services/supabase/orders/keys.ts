export const orderKeys = {
  all: () => ['orders'] as const,
  lists: () => [...orderKeys.all(), 'list'] as const,
  list: (userId: string, page?: number) => [...orderKeys.lists(), userId, page] as const,
  recent: (userId: string) => [...orderKeys.all(), 'recent', userId] as const,
  detail: (orderId: string) => [...orderKeys.all(), 'detail', orderId] as const,
};
