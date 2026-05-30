import { supabase } from '../client';
import {
  mapSupabaseCategoryToCategory,
  mapSupabaseTagToTag,
  mapSupabasePostToPost,
  mapSupabaseCommentToComment,
  mapCommentPayloadToSupabase,
  mapSupabaseRecentPostToRecentPost,
} from './adapters';
import type {
  BlogCategory,
  BlogTag,
  BlogPost,
  BlogComment,
  BlogPostsResponse,
  BlogPostsQuery,
  CreateCommentPayload,
  RecentBlogPost,
} from './types';
import type { ServiceResponse } from '../types';

const DEFAULT_POSTS_PER_PAGE = 12;

export const blogAPI = {
  // ── Categories ─────────────────────────────────
  getCategories: async (): Promise<ServiceResponse<BlogCategory[]>> => {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('sort_order', { ascending: true, nullsFirst: false });

    if (error) return { data: null, error: { message: error.message } };
    return { data: data.map(mapSupabaseCategoryToCategory), error: null };
  },

  // ── Tags ──────────────────────────────────────
  getTags: async (): Promise<ServiceResponse<BlogTag[]>> => {
    const { data, error } = await supabase.from('blog_tags').select('*').order('name');

    if (error) return { data: null, error: { message: error.message } };
    return { data: data.map(mapSupabaseTagToTag), error: null };
  },

  // ── Blog Posts (paginated + filters) ─────────
  getPosts: async (query: BlogPostsQuery = {}): Promise<ServiceResponse<BlogPostsResponse>> => {
    const {
      page = 1,
      limit = DEFAULT_POSTS_PER_PAGE,
      category,
      tag,
      search,
      sortBy = 'published_at',
      sortOrder = 'desc',
    } = query;

    let dbQuery = supabase.from('blog_posts').select(
      `
        *,
        blog_categories${category ? '!inner' : ''} (*),
        blog_post_tags${tag ? '!inner' : ''} (
          blog_tags${tag ? '!inner' : ''} (*)
        )
      `,
      { count: 'exact' },
    );

    // Only show published posts (published_at <= now)
    dbQuery = dbQuery.lte('published_at', new Date().toISOString());

    // Filters
    if (category) {
      dbQuery = dbQuery.eq('blog_categories.slug', category);
    }
    if (tag) {
      dbQuery = dbQuery.eq('blog_post_tags.blog_tags.slug', tag);
    }
    if (search) {
      dbQuery = dbQuery.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    // Sorting
    const orderColumn =
      sortBy === 'title' ? 'title' : sortBy === 'created_at' ? 'created_at' : 'published_at';
    dbQuery = dbQuery.order(orderColumn, { ascending: sortOrder === 'asc' });

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    dbQuery = dbQuery.range(from, to);

    const { data, error, count } = await dbQuery;

    if (error) return { data: null, error: { message: error.message } };

    const posts = data.map(mapSupabasePostToPost);
    return {
      data: { posts, total: count ?? 0 },
      error: null,
    };
  },

  // ── Single Post by Slug ───────────────────────
  getPostBySlug: async (slug: string): Promise<ServiceResponse<BlogPost>> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(
        `
        *,
        blog_categories (*),
        blog_post_tags (blog_tags (*))
      `,
      )
      .eq('slug', slug)
      .lte('published_at', new Date().toISOString())
      .single();

    if (error) return { data: null, error: { message: error.message } };
    return { data: mapSupabasePostToPost(data), error: null };
  },

  // ─── Single Post by ID (for admin) ────────────
  getPostById: async (id: string): Promise<ServiceResponse<BlogPost>> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(
        `
        *,
        blog_categories (*),
        blog_post_tags (blog_tags (*))
      `,
      )
      .eq('id', id)
      .single();

    if (error) return { data: null, error: { message: error.message } };
    return { data: mapSupabasePostToPost(data), error: null };
  },

  // ─── Recent Posts (for sidebar) ───────────────
  getRecentPosts: async (limit: number = 5): Promise<ServiceResponse<RecentBlogPost[]>> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, cover_image, published_at')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) return { data: null, error: { message: error.message } };
    return { data: data.map(mapSupabaseRecentPostToRecentPost), error: null };
  },

  // ─── Comments for a Post (paginated) ─────────
  getComments: async (
    postId: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<ServiceResponse<{ comments: BlogComment[]; total: number }>> => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('blog_comments')
      .select('*', { count: 'exact' })
      .eq('post_id', postId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) return { data: null, error: { message: error.message } };
    return {
      data: {
        comments: data.map(mapSupabaseCommentToComment),
        total: count ?? 0,
      },
      error: null,
    };
  },

  // ─── Add a Comment ────────────────────────────
  addComment: async (payload: CreateCommentPayload): Promise<ServiceResponse<BlogComment>> => {
    const { data, error } = await supabase
      .from('blog_comments')
      .insert(mapCommentPayloadToSupabase(payload))
      .select()
      .single();

    if (error) return { data: null, error: { message: error.message } };

    // Increment comment_count on blog_posts
    await supabase.rpc('increment_blog_comment_count', { post_id: payload.postId });

    return { data: mapSupabaseCommentToComment(data), error: null };
  },
};
