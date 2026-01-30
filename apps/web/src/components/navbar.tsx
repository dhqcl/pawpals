'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { Menu, X, PawPrint, LogOut, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export function Navbar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Explore', href: '/explore' },
        { name: 'Wiki', href: '/wiki' },
    ];

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <PawPrint className="h-8 w-8 text-brand-600" />
                    <span className="text-xl font-bold text-neutral-900">PetVerse</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:items-center md:gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-brand-600",
                                pathname === link.href ? "text-brand-600" : "text-neutral-600"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* User Actions (Desktop) */}
                <div className="hidden md:flex md:items-center md:gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href={`/u/${user.username}`}>
                                <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 transition-colors hover:bg-neutral-100">
                                    <div className="h-6 w-6 overflow-hidden rounded-full bg-neutral-200">
                                        {user.avatar_url ? (
                                            <img src={user.avatar_url} alt={user.username} className="h-full w-full object-cover" />
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
                        </div>
    </nav>
                );
}
