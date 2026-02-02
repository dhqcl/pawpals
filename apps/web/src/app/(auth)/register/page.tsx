'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthResponseDto, RegisterDto } from '@petverse/shared';
import { useAuth } from '@/hooks/use-auth';

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState<RegisterDto>({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const mutation = useMutation({
        mutationFn: async (data: RegisterDto) => {
            const res = await api.post<AuthResponseDto>('/auth/register', data);
            return res.data;
        },
        onSuccess: (data) => {
            login(data.accessToken, data.user);
        },
        onError: (err: any) => {
            const msg = err.response?.data?.message;
            setError(msg === 'Username or email already exists' ? '用户名或邮箱已被注册' : (msg || '注册失败'));
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-brand-600">PetVerse</h1>
                    <p className="mt-2 text-neutral-600">创建你的账号。</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="用户名"
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                        placeholder="PetLover123"
                    />
                    <Input
                        label="邮箱"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="you@example.com"
                    />
                    <Input
                        label="密码"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        placeholder="••••••••"
                        minLength={6}
                    />

                    {error && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 text-center">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" isLoading={mutation.isPending}>
                        注册
                    </Button>
                </form>

                <p className="text-center text-sm text-neutral-600">
                    已经有账号了？{' '}
                    <Link href="/login" className="font-medium text-brand-600 hover:text-brand-500">
                        直接登录
                    </Link>
                </p>
            </div>
        </div>
    );
}
