'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { PostCard } from '@/components/feed/post-card';
import { CreatePostModal } from '@/components/feed/create-post-modal';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function FeedPage() {
  const { user } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['feed'],
    queryFn: async () => {
      const res = await api.get('/posts?limit=20');
      return res.data;
    },
  });

  const posts = data?.data || [];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Feed Header */}
        <div className="flex items-center justify-between mb-8 sticky top-16 z-20 bg-neutral-50/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-neutral-200/50">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              Feed <Sparkles className="h-5 w-5 text-brand-500" />
            </h1>
          </div>
          {user && (
            <Button onClick={() => setIsCreateOpen(true)} size="sm" className="rounded-full shadow-lg shadow-brand-500/20">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          )}
        </div>

        {/* Create Post Trigger (Mobile/Desktop prominent) */}
        {user && posts.length > 0 && (
          <div
            onClick={() => setIsCreateOpen(true)}
            className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-neutral-100 flex items-center gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-neutral-100 overflow-hidden">
              {user.avatar_url && <img src={user.avatar_url} className="h-full w-full object-cover" />}
            </div>
            <div className="flex-1 bg-neutral-100 h-10 rounded-full flex items-center px-4 text-neutral-500 text-sm">
              What's happening?
            </div>
          </div>
        )}

        {/* Posts List */}
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
            <div className="py-8 text-center text-neutral-400 text-sm">
              You're all caught up! 🐾
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Sparkles className="h-10 w-10 text-brand-300" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">暂无动态</h3>
            <p className="text-neutral-500 mt-2">快来发布你的第一条动态吧！</p>
            {user && (
              <Button onClick={() => setIsCreateOpen(true)} className="mt-6">
                发布动态
              </Button>
            )}
          </div>
        )}

        <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      </div>
    </div>
  );
}
