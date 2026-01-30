'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Breed } from '@petverse/shared';
import Link from 'next/link';

export default function WikiPage() {
    const { data: breeds, isLoading } = useQuery({
        queryKey: ['breeds'],
        queryFn: async () => {
            const res = await api.get<Breed[]>('/wiki/breeds');
            return res.data;
        },
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-neutral-900">Pet Wiki</h1>
                <p className="mt-4 text-lg text-neutral-600">Discover popular breeds and their characteristics</p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-80 rounded-2xl bg-neutral-200 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {breeds?.map((breed) => (
                        <Link
                            key={breed.id}
                            href={`/wiki/${breed.id}`}
                            className="group relative block h-80 overflow-hidden rounded-2xl bg-neutral-100 transition-transform hover:-translate-y-1"
                        >
                            <img
                                src={breed.example_image_url}
                                alt={breed.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <span className="inline-block px-2 py-1 mb-2 text-xs font-bold bg-white/20 backdrop-blur-sm rounded-full">
                                    {breed.species}
                                </span>
                                <h3 className="text-2xl font-bold">{breed.name}</h3>
                                <p className="text-sm text-neutral-200 line-clamp-2">{breed.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
