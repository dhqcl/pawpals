'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Breed {
    id: string;
    name: string;
    species: 'DOG' | 'CAT' | 'OTHER';
    description: string;
    example_image_url: string;
    characteristics: Record<string, any>;
}

// Next.js 15+ Params are async in Server Components, but in Client Components with useParams() hook it's direct?
// Actually useParams() returns ReadonlyURLSearchParams or Params.
// Let's use standard pattern.

export default function BreedDetailPage() {
    const { id } = useParams();

    const { data: breed, isLoading } = useQuery({
        queryKey: ['breed', id],
        queryFn: async () => {
            const res = await api.get<Breed>(`/wiki/breeds/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading || !breed) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="bg-neutral-50 min-h-screen pb-20">
            <div className="relative h-[50vh] w-full">
                <img
                    src={breed.example_image_url}
                    alt={breed.name}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-neutral-50" />
                <Link
                    href="/wiki"
                    className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-brand-100 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Wiki
                </Link>
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-32 relative z-10">
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-sm font-bold bg-brand-100 text-brand-700 rounded-full">
                            {breed.species}
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">{breed.name}</h1>
                    <p className="text-xl text-neutral-600 leading-relaxed mb-12">
                        {breed.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {Object.entries(breed.characteristics || {}).map(([key, value]) => (
                            <div key={key} className="bg-neutral-50 rounded-2xl p-6 text-center">
                                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">{key}</p>
                                <p className="text-lg font-semibold text-neutral-900 capitalize">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
