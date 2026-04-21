export const profileKeys = {
  all: () => ['profiles'] as const,
  profile: (id: string) => [...profileKeys.all(), id] as const,
};
