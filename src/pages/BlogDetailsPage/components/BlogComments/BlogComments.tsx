import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Buttons/Button/Button';
import { useBlogComments } from '../../hooks/useBlogComments';
import dayjs from 'dayjs';

interface BlogCommentsProps {
  postId: string;
}

export const BlogComments = ({ postId }: BlogCommentsProps) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const {
    comments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isAddingComment,
    addComment,
    user,
    handleSignInRedirect,
  } = useBlogComments(postId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    addComment(message, {
      onSuccess: () => setMessage(''),
    });
  };

  return (
    <div className="flex flex-col gap-8 mt-8">
      <h3 className="text-2xl font-semibold text-gray-900">
        {t('blog.comments.title', 'Leave a Comment')}
      </h3>

      {/* Comment Form / Sign In Prompt */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">
              {t('blog.comments.messageLabel', 'Message')}
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder={t('blog.comments.messagePlaceholder', 'Write your comment here...')}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isAddingComment || !message.trim()}
              className="px-8 py-2.5 rounded-full"
            >
              {isAddingComment
                ? t('blog.comments.posting', 'Posting...')
                : t('blog.comments.postBtn', 'Post Comment')}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100 text-center gap-4">
          <p className="text-gray-600">
            {t('blog.comments.loginPrompt', 'You must be signed in to post a comment.')}
          </p>
          <Button onClick={handleSignInRedirect} className="px-6 py-2 rounded-full">
            {t('blog.comments.signInBtn', 'Sign In to Comment')}
          </Button>
        </div>
      )}

      {/* Comments List */}
      <div className="flex flex-col gap-6 mt-4">
        <h4 className="text-xl font-medium text-gray-900">
          {t('blog.comments.allComments', 'Comments')} ({comments.length})
        </h4>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2].map(i => (
              <div
                key={i}
                className="flex gap-4 p-4 border border-gray-100 rounded-xl animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          <div className="flex flex-col gap-6">
            {comments.map(comment => (
              <div
                key={comment.id}
                className="flex gap-4 items-start pb-6 border-b border-gray-100 last:border-0"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {comment.userAvatar ? (
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold bg-primary/10 text-primary">
                      {comment.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-gray-900">{comment.userName}</h5>
                    <span className="text-xs text-gray-500">
                      {dayjs(comment.createdAt).format('MMM DD, YYYY')}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mt-1 whitespace-pre-wrap">
                    {comment.message}
                  </p>
                </div>
              </div>
            ))}

            {hasNextPage && (
              <div className="flex justify-start">
                <Button
                  variant="border"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="rounded-full px-8"
                >
                  {isFetchingNextPage
                    ? t('blog.comments.loadingMore', 'Loading...')
                    : t('blog.comments.loadMore', 'Load More')}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            {t('blog.comments.noComments', 'No comments yet. Be the first to share your thoughts!')}
          </div>
        )}
      </div>
    </div>
  );
};
