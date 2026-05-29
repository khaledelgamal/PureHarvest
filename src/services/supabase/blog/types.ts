// ─── Blog Category ────────────────────────────
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  sortOrder: number | null;
}

// ─── Blog Tag ─────────────────────────────────
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

// ─── Blog Post ────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  coverImage: string | null;
  authorName: string | null;
  authorAvatar: string | null;
  categoryId: string | null;
  category?: BlogCategory; // populated when joined
  tags?: BlogTag[]; // populated when joined
  commentCount: number | null;
  readTime: number | null; // minutes
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Blog Comment ─────────────────────────────
export interface BlogComment {
  id: string;
  postId: string;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
  message: string;
  createdAt: string;
}

export interface RecentBlogPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  publishedAt: string | null;
}

// ─── For creating a comment (FE sends) ────────
export interface CreateCommentPayload {
  postId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string | null;
  message: string;
}

// ─── Pagination (consistent with orders) ──────
export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
}

// ─── Query params ─────────────────────────────
export interface BlogPostsQuery {
  page?: number; // 1-indexed
  limit?: number; // default 12
  category?: string; // category slug
  tag?: string; // tag slug
  search?: string; // search in title/excerpt
  sortBy?: 'published_at' | 'created_at' | 'title';
  sortOrder?: 'asc' | 'desc';
}
