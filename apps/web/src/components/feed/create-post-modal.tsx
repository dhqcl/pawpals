'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Image, X } from 'lucide-react';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
    const queryClient = useQueryClient();
    const [content, setContent] = useState('');
    const [mediaUrl, setMediaUrl] = useState(''); // Simple URL input for now
    const [location, setLocation] = useState('');

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const payload = {
                content: data.content,
                location: data.location || undefined,
                media_urls: data.mediaUrl ? [data.mediaUrl] : [],
            };
            const res = await api.post('/posts', payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            onClose();
            setContent('');
            setMediaUrl('');
            setLocation('');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        mutation.mutate({ content, mediaUrl, location });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="发布新动态">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="content" className="sr-only">内容</label>
                    <textarea
                        id="content"
                        className="w-full min-h-[120px] rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
                        placeholder="分享你的宠物趣事..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700">添加图片 (可选)</label>
                    <div className="mt-1 flex items-center gap-2">
                        <input
                            type="url"
                            className="block w-full rounded-lg border-neutral-200 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500"
                            placeholder="输入图片 URL"
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                        />
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50">
                            <Image className="h-5 w-5 text-neutral-400" />
                        </div>
                    </div>
                </div>

                {mediaUrl && (
                    <div className="relative rounded-lg overflow-hidden h-32 w-full bg-neutral-100">
                        <img src={mediaUrl} alt="预览" className="h-full w-full object-cover" />
                        <button
                            type="button"
                            onClick={() => setMediaUrl('')}
                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="ghost" onClick={onClose}>取消</Button>
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? '发布中...' : '发布'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
