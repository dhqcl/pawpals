'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { Menu, X, PawPrint, LogOut, User } from 'lucide-react';
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
                                            <User className="h-4 w-4 m-1 text-neutral-500" />
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-neutral-900">{user.username}</span>
                                </div>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={logout}>
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Log in</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Sign up</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden border-t border-neutral-200 bg-white"
                    >
                        <div className="space-y-1 px-4 py-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                                        pathname === link.href
                                            ? "bg-brand-50 text-brand-600"
                                            : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="border-t border-neutral-200 pt-4 pb-6 px-4">
                            {user ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 px-3">
                                        <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-200">
                                            {user.avatar_url ? (
                                                <img src={user.avatar_url} alt={user.username} className="h-full w-full object-cover" />
                                            ) : (
                                                <User className="h-6 w-6 m-2 text-neutral-500" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-base font-medium text-neutral-800">{user.username}</div>
                                            <div className="text-sm font-medium text-neutral-500">{user.email}</div>
                                        </div>
                                    </div>
                                    <div className="space-y-1 mt-3">
                                        <Link
                                            href={`/u/${user.username}`}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="block rounded-md px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 px-3">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center">Log in</Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full justify-center">Sign up</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
