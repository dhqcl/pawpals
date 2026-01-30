'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Image, Loader2, MapPin } from 'lucide-react';

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
        <Modal isOpen={isOpen} onClose={onClose} title="Create Post">
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    className="w-full min-h-[120px] rounded-lg border border-neutral-200 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
                    placeholder="What's your pet up to today?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {mediaUrl && (
                    <div className="relative rounded-lg overflow-hidden h-32 w-full bg-neutral-100">
                        <img src={mediaUrl} alt="Preview" className="h-full w-full object-cover" />
                        <button
                            type="button"
                            onClick={() => setMediaUrl('')}
                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                        >
                            <span className="sr-only">Remove</span>
                            &times;
                        </button>
                    </div>
                )}

                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <Image className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <input
                            type="url"
                            placeholder="Image URL (e.g. from Unsplash)"
                            className="w-full h-10 pl-9 rounded-md border border-neutral-200 text-sm focus:border-brand-500 focus:outline-none"
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="w-full h-10 pl-9 rounded-md border border-neutral-200 text-sm focus:border-brand-500 focus:outline-none"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <Button type="submit" disabled={!content.trim()} isLoading={mutation.isPending}>
                        Post
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
