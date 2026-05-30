import type {
  BlogCategory,
  BlogTag,
  BlogPost,
  BlogComment,
  CreateCommentPayload,
  RecentBlogPost,
} from './types';

// ─── Supabase raw shapes ──────────────────────

interface SupabaseBlogCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number | null;
}

interface SupabaseBlogTag {
  id: string;
  name: string;
  slug: string;
}

interface SupabaseBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_image: string | null;
  author_name: string | null;
  author_avatar: string | null;
  category_id: string | null;
  comment_count: number | null;
  read_time: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // joined fields
  blog_categories?: SupabaseBlogCategory | null;
  blog_post_tags?: { blog_tags: SupabaseBlogTag }[];
}

interface SupabaseBlogComment {
  id: string;
  post_id: string;
  user_name: string;
  user_email: string;
  user_avatar: string | null;
  message: string;
  created_at: string;
}
interface SupabaseRecentBlogPost {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  published_at: string | null;
}
// ─── Output: Supabase → FE ────────────────────

export const mapSupabaseCategoryToCategory = (raw: SupabaseBlogCategory): BlogCategory => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  sortOrder: raw.sort_order,
});

export const mapSupabaseTagToTag = (raw: SupabaseBlogTag): BlogTag => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
});

export const mapSupabasePostToPost = (raw: SupabaseBlogPost): BlogPost => ({
  id: raw.id,
  title: raw.title,
  slug: raw.slug,
  content: raw.content,
  excerpt: raw.excerpt,
  coverImage: raw.cover_image,
  authorName: raw.author_name,
  authorAvatar: raw.author_avatar,
  categoryId: raw.category_id,
  category: raw.blog_categories ? mapSupabaseCategoryToCategory(raw.blog_categories) : undefined,
  tags: raw.blog_post_tags?.map(link => mapSupabaseTagToTag(link.blog_tags)) ?? [],
  commentCount: raw.comment_count ?? 0,
  readTime: raw.read_time,
  publishedAt: raw.published_at,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
});

export const mapSupabaseCommentToComment = (raw: SupabaseBlogComment): BlogComment => ({
  id: raw.id,
  postId: raw.post_id,
  userName: raw.user_name,
  userEmail: raw.user_email,
  userAvatar: raw.user_avatar,
  message: raw.message,
  createdAt: raw.created_at,
});

// ─── Input: FE → Supabase ─────────────────────

export const mapCommentPayloadToSupabase = (payload: CreateCommentPayload) => ({
  post_id: payload.postId,
  user_name: payload.userName,
  user_email: payload.userEmail,
  user_avatar: payload.userAvatar ?? null,
  message: payload.message,
});

export const mapSupabaseRecentPostToRecentPost = (raw: SupabaseRecentBlogPost): RecentBlogPost => ({
  id: raw.id,
  title: raw.title,
  slug: raw.slug,
  coverImage: raw.cover_image,
  publishedAt: raw.published_at,
});
