'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { User, Pet } from '@petverse/shared';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { PetCard } from '@/components/pets/pet-card';
import { Button } from '@/components/ui/button';
import { AddPetModal } from '@/components/pets/add-pet-modal';
import { useState } from 'react';
import { Plus, Settings, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const { username } = useParams();
    const { user: currentUser } = useAuth();
    const [isAddPetOpen, setIsAddPetOpen] = useState(false);

    // Fetch Profile User
    const { data: profileUser, isLoading: isUserLoading } = useQuery({
        queryKey: ['user', username],
        queryFn: async () => {
            const res = await api.get<User>(`/users/${username}`);
            return res.data;
        },
        enabled: !!username,
    });

    // Fetch Pets (If viewing own profile, fetch via /pets which gets my pets, 
    // else we might need a public endpoint or relation in user object)
    // The service findOneByUsername already includes relations: ['pets', 'pets.breed']
    // So profileUser should have pets.
    const pets = (profileUser as any)?.pets as Pet[] || [];

    const isOwner = currentUser?.username === username;

    if (isUserLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
            </div>
        );
    }

    if (!profileUser) {
        return (
            <div className="p-8 text-center text-neutral-500">
                User not found.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Profile Header */}
            <div className="mb-12 flex flex-col items-center sm:flex-row sm:items-start sm:gap-8">
                <div className="h-32 w-32 shrink-0 rounded-full border-4 border-white bg-brand-100 shadow-lg flex items-center justify-center text-brand-500">
                    {profileUser.avatar_url ? (
                        <img src={profileUser.avatar_url} alt={profileUser.username} className="h-full w-full rounded-full object-cover" />
                    ) : (
                        <UserIcon className="h-16 w-16" />
                    )}
                </div>

                <div className="mt-4 text-center sm:mt-2 sm:text-left flex-1">
                    <div className="flex items-center gap-4 justify-center sm:justify-start">
                        <h1 className="text-3xl font-bold text-neutral-900">{profileUser.username}</h1>
                        {isOwner && (
                            <Link href="/settings">
                                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </Link>
                        )}
                    </div>
                    <p className="mt-2 text-neutral-600 max-w-lg">
                        {profileUser.bio || `Hi, I'm ${profileUser.username} and I love pets!`}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4 justify-center sm:justify-start">
                        <div className="text-center">
                            <span className="block text-xl font-bold text-neutral-900">{pets.length}</span>
                            <span className="text-sm text-neutral-500">Pets</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-xl font-bold text-neutral-900">0</span>
                            <span className="text-sm text-neutral-500">Followers</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-xl font-bold text-neutral-900">0</span>
                            <span className="text-sm text-neutral-500">Following</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs / Sections */}
            <div className="border-b border-neutral-200 mb-8">
                <nav className="flex gap-8">
                    <button className="border-b-2 border-brand-600 pb-4 text-sm font-medium text-brand-600">
                        Pets
                    </button>
                    <button className="border-b-2 border-transparent pb-4 text-sm font-medium text-neutral-500 hover:text-neutral-700">
                        Posts
                    </button>
                    <button className="border-b-2 border-transparent pb-4 text-sm font-medium text-neutral-500 hover:text-neutral-700">
                        About
                    </button>
                </nav>
            </div>

            {/* Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-neutral-900">My Pets</h2>
                    {isOwner && (
                        <Button onClick={() => setIsAddPetOpen(true)} size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Pet
                        </Button>
                    )}
                </div>

                {pets.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-neutral-300 p-12 text-center">
                        <p className="text-neutral-500">No pets added yet.</p>
                        {isOwner && (
                            <Button variant="outline" className="mt-4" onClick={() => setIsAddPetOpen(true)}>
                                Add your first pet
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {pets.map((pet) => (
                            <PetCard key={pet.id} pet={pet} />
                        ))}
                    </div>
                )}
            </div>

            <AddPetModal isOpen={isAddPetOpen} onClose={() => setIsAddPetOpen(false)} />
        </div>
    );
}
