export const blogKeys = {
  all: () => ['blogs'] as const,

  // Categories
  categories: () => [...blogKeys.all(), 'categories'] as const,

  // Tags
  tags: () => [...blogKeys.all(), 'tags'] as const,

  // Posts (list with filters)
  posts: (params?: Record<string, unknown>) => [...blogKeys.all(), 'posts', params] as const,

  // Single post by slug
  postBySlug: (slug: string) => [...blogKeys.all(), 'post', slug] as const,

  // Single post by ID (for admin/edit)
  postById: (id: string) => [...blogKeys.all(), 'post', 'id', id] as const,

  // Comments for a post
  comments: (postId: string, page?: number) =>
    [...blogKeys.all(), 'comments', postId, page] as const,

  // Recent posts (sidebar widget)
  recentPosts: (limit: number) => [...blogKeys.all(), 'recent', limit] as const,
};
