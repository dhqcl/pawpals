import { Pet } from '@petverse/shared';
import { Calendar, Dna, Info } from 'lucide-react';

interface PetCardProps {
    pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
    const age = new Date().getFullYear() - new Date(pet.birthday).getFullYear();
    const displayAge = age === 0 ? '< 1 year' : `${age} years`;

    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md border border-neutral-100">
            <div className="relative h-48 w-full bg-neutral-100">
                {pet.avatar_url ? (
                    <img src={pet.avatar_url} alt={pet.nickname} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-400">
                        [No Image]
                    </div>
                )}
                <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-neutral-800 backdrop-blur-sm">
                    {pet.gender}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-neutral-900">{pet.nickname}</h3>
                <p className="text-sm text-brand-600 font-medium">{pet.breed?.name || 'Unknown Breed'}</p>

                <div className="mt-4 space-y-2 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{displayAge}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        <span>{pet.is_neutered ? 'Neutered' : 'Intact'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
