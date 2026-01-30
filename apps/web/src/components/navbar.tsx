'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { LogOut, User as UserIcon } from 'lucide-react';

export function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check for user in local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <nav className="border-b border-neutral-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-brand-600">PetVerse</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/wiki" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
                        Wiki
                    </Link>
                    <Link href="/explore" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
                        Explore
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4 pl-4 border-l border-neutral-200">
                            <Link href={`/u/${user.username}`} className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-brand-600">
                                <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                                    {user.avatar_url ? (
                                        <img src={user.avatar_url} alt={user.username} className="h-full w-full rounded-full object-cover" />
                                    ) : (
                                        <UserIcon className="h-4 w-4" />
                                    )}
                                </div>
                                <span className="hidden sm:inline-block">{user.username}</span>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={handleLogout}>
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 pl-4 border-l border-neutral-200">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
