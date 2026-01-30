'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { UpdateUserDto } from '@petverse/shared';

export default function SettingsPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<UpdateUserDto>({
        bio: '',
        avatar_url: '',
    });
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize form with user data
    if (user && !isInitialized) {
        setFormData({
            bio: user.bio || '',
            avatar_url: user.avatar_url || '',
        });
        setIsInitialized(true);
    }

    const mutation = useMutation({
        mutationFn: async (data: UpdateUserDto) => {
            const res = await api.put('/users/me', data);
            return res.data;
        },
        onSuccess: (updatedUser) => {
            // Update local storage and query cache
            localStorage.setItem('user', JSON.stringify(updatedUser)); // Basic sync
            queryClient.setQueryData(['user', user.username], updatedUser);
            router.push(`/u/${user.username}`);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (!user) {
        router.push('/login');
        return null;
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
            <h1 className="text-2xl font-bold text-neutral-900 mb-8">Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-lg font-semibold mb-6">Edit Profile</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Avatar URL"
                        placeholder="https://example.com/avatar.jpg"
                        value={formData.avatar_url}
                        onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    />

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-neutral-700">Bio</label>
                        <textarea
                            className="w-full min-h-[100px] rounded-md border border-neutral-300 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                            placeholder="Tell us about yourself..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="ghost" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={mutation.isPending}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
