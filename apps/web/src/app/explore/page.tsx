'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { PostCard } from '@/components/feed/post-card';
import { Search, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState('');

    const { data: posts, isLoading } = useQuery({
        queryKey: ['explore-posts'],
        queryFn: async () => {
            const { data } = await api.get('/posts?limit=20');
            return data.data;
        },
    });

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8">
            <div className="mb-8">
                <h1 className="mb-6 text-3xl font-bold text-neutral-900">发现</h1>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                        type="search"
                        className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-4 pl-10 text-sm text-neutral-900 focus:border-brand-500 focus:ring-brand-500"
                        placeholder="搜索帖子、用户或宠物..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button className="absolute bottom-2.5 right-2.5" size="sm">
                        搜索
                    </Button>
                </div>

                {/* Trending Tags (Mock) */}
                <div className="mb-8">
                    <div className="item-center mb-4 flex gap-2 text-sm font-semibold text-neutral-700">
                        <TrendingUp className="h-4 w-4" />
                        <span>热门话题</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['#萌宠日常', '#猫咪', '#狗狗', '#搞笑瞬间', '#领养代替购买'].map((tag) => (
                            <span
                                key={tag}
                                className="cursor-pointer rounded-full bg-white px-3 py-1 text-sm font-medium text-brand-600 shadow-sm transition-colors hover:bg-brand-50"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <h2 className="mb-4 text-xl font-bold text-neutral-900">热门推荐</h2>
            <div className="space-y-6">
                {isLoading ? (
                    <div className="py-20 text-center text-neutral-500">加载中...</div>
                ) : posts?.length > 0 ? (
                    posts.map((post: any) => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <div className="py-20 text-center text-neutral-500">
                        暂无推荐内容
                    </div>
                )}
            </div>
        </div>
    );
}
