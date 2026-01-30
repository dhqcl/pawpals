'use client';

import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import { User, Heart, MessageCircle, Share2, MapPin, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Post {
    id: string;
    content: string;
    media_urls?: string[];
    location?: string;
    like_count: number;
    comment_count: number;
    created_at: string;
    isLiked?: boolean;
    author: {
        id: string;
        username: string;
        avatar_url?: string;
    };
}

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const queryClient = useQueryClient();
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState(post.like_count);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

    // Fetch comments if open
    const { data: comments } = useQuery({
        queryKey: ['comments', post.id],
        queryFn: async () => {
            const res = await api.get<any[]>(`/posts/${post.id}/comments`);
            return res.data;
        },
        enabled: showComments,
    });

    const likeMutation = useMutation({
        mutationFn: async () => {
            await api.post(`/posts/${post.id}/like`);
        },
        onMutate: async () => {
            const previousLiked = isLiked;
            const previousCount = likeCount;
            setIsLiked(!isLiked);
            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
            return { previousLiked, previousCount };
        },
        onError: (err, newTodo, context) => {
            setIsLiked(context?.previousLiked);
            setLikeCount(context?.previousCount!);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
        }
    });

    const commentMutation = useMutation({
        mutationFn: async (text: string) => {
            await api.post(`/posts/${post.id}/comments`, { content: text });
        },
        onSuccess: () => {
            setCommentText('');
            queryClient.invalidateQueries({ queryKey: ['comments', post.id] });
            queryClient.invalidateQueries({ queryKey: ['feed'] }); // Update count
        }
    });

    const handleLike = () => {
        likeMutation.mutate();
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        commentMutation.mutate(commentText);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden mb-6">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <Link href={`/u/${post.author.username}`} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-neutral-100 overflow-hidden">
                        {post.author.avatar_url ? (
                            <img src={post.author.avatar_url} alt={post.author.username} className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center bg-brand-100 text-brand-600">
                                <User className="h-5 w-5" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm text-neutral-900">{post.author.username}</h3>
                        {post.location && (
                            <div className="flex items-center text-xs text-neutral-500">
                                <MapPin className="h-3 w-3 mr-1" />
                                {post.location}
                            </div>
                        )}
                    </div>
                </Link>
                <span className="text-xs text-neutral-400">
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </span>
            </div>

            {/* Media */}
            {post.media_urls && post.media_urls.length > 0 && (
                <div className={cn("grid gap-0.5", post.media_urls.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
                    {post.media_urls.map((url, index) => (
                        <div key={index} className="aspect-square bg-neutral-100 relative overflow-hidden">
                            <img src={url} alt="Post media" className="absolute inset-0 h-full w-full object-cover" />
                        </div>
                    ))}
                </div>
            )}

            {/* Content & Actions */}
            <div className="p-4">
                <p className="text-neutral-800 text-sm mb-4 whitespace-pre-wrap">{post.content}</p>

                <div className="flex items-center gap-6 border-t border-neutral-50 pt-3">
                    <button
                        onClick={handleLike}
                        className={cn(
                            "flex items-center gap-2 transition-colors",
                            isLiked ? "text-red-500" : "text-neutral-500 hover:text-red-500"
                        )}
                    >
                        <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
                        <span className="text-sm font-medium">{likeCount}</span>
                    </button>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className={cn(
                            "flex items-center gap-2 transition-colors",
                            showComments ? "text-blue-500" : "text-neutral-500 hover:text-blue-500"
                        )}
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">{post.comment_count}</span>
                    </button>
                    <button className="flex items-center gap-2 text-neutral-500 hover:text-green-500 transition-colors ml-auto">
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="bg-neutral-50 p-4 border-t border-neutral-100">
                    {/* List */}
                    <div className="space-y-4 mb-4">
                        {comments?.map((comment: any) => (
                            <div key={comment.id} className="flex gap-3">
                                <div className="h-8 w-8 rounded-full bg-neutral-200 overflow-hidden flex-shrink-0">
                                    {comment.author?.avatar_url ? (
                                        <img src={comment.author.avatar_url} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-white text-neutral-400">
                                            <User className="h-4 w-4" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 bg-white rounded-lg p-3 shadow-sm">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-xs font-bold text-neutral-900">{comment.author?.username}</span>
                                        <span className="text-[10px] text-neutral-400">
                                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-neutral-700">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                        {comments?.length === 0 && (
                            <p className="text-center text-xs text-neutral-500 py-2">No comments yet.</p>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleCommentSubmit} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="flex-1 rounded-full border border-neutral-300 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={!commentText.trim() || commentMutation.isPending}
                            className="bg-brand-600 text-white rounded-full p-2 hover:bg-brand-700 disabled:opacity-50"
                        >
                            {commentMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
