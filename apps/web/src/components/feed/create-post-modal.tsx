'use client';

import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Image, X, Video, Loader2 } from 'lucide-react';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
    const queryClient = useQueryClient();
    const [content, setContent] = useState('');
    const [mediaUrls, setMediaUrls] = useState<string[]>([]);
    const [location, setLocation] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadMutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            const res = await api.post('/uploads/file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res.data.url;
        },
        onError: () => {
            alert('上传失败，请重试');
            setIsUploading(false);
        }
    });

    const createPostMutation = useMutation({
        mutationFn: async (data: any) => {
            const payload = {
                content: data.content,
                location: data.location || undefined,
                media_urls: data.mediaUrls,
            };
            const res = await api.post('/posts', payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            onClose();
            setContent('');
            setMediaUrls([]);
            setLocation('');
        },
    });

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsUploading(true);
            const file = e.target.files[0];
            try {
                const url = await uploadMutation.mutateAsync(file);
                setMediaUrls([...mediaUrls, url]);
            } catch (err) {
                console.error(err);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() && mediaUrls.length === 0) return;
        createPostMutation.mutate({ content, mediaUrls, location });
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
                        required={mediaUrls.length === 0}
                    />
                </div>

                {/* Media Preview */}
                {mediaUrls.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                        {mediaUrls.map((url, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden h-32 bg-neutral-100 group">
                                <img src={url} alt="Preview" className="h-full w-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setMediaUrls(mediaUrls.filter((_, i) => i !== index))}
                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*,video/*"
                        onChange={handleFileSelect}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                    >
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Image className="h-4 w-4 mr-2" />}
                        添加图片/视频
                    </Button>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="ghost" onClick={onClose}>取消</Button>
                    <Button type="submit" disabled={createPostMutation.isPending || isUploading}>
                        {createPostMutation.isPending ? '发布中...' : '发布'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
