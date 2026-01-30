'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreatePetDto, Gender } from '@petverse/shared';
import api from '@/lib/api';

interface AddPetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddPetModal({ isOpen, onClose }: AddPetModalProps) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<CreatePetDto>({
        nickname: '',
        gender: Gender.MALE,
        birthday: '',
        breedId: '',
        is_neutered: false,
    });

    const { data: breeds } = useQuery({
        queryKey: ['breeds'],
        queryFn: async () => {
            const res = await api.get<any[]>('/wiki/breeds');
            return res.data;
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: CreatePetDto) => {
            const res = await api.post('/pets', data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-pets'] });
            onClose();
            // Reset form
            setFormData({
                nickname: '',
                gender: Gender.MALE,
                birthday: '',
                breedId: '',
                is_neutered: false,
            });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Pet">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Nickname"
                    value={formData.nickname}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    required
                />

                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">Breed</label>
                    <select
                        className="w-full rounded-md border border-neutral-300 p-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        value={formData.breedId}
                        onChange={(e) => setFormData({ ...formData, breedId: e.target.value })}
                        required
                    >
                        <option value="">Select a breed...</option>
                        {breeds?.map((breed) => (
                            <option key={breed.id} value={breed.id}>
                                {breed.name} ({breed.species})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            className="w-full rounded-md border border-neutral-300 p-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                        >
                            <option value={Gender.MALE}>Male</option>
                            <option value={Gender.FEMALE}>Female</option>
                        </select>
                    </div>

                    <Input
                        label="Birthday"
                        type="date"
                        value={formData.birthday}
                        onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                        required
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="neutered"
                        checked={formData.is_neutered}
                        onChange={(e) => setFormData({ ...formData, is_neutered: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                    <label htmlFor="neutered" className="text-sm text-gray-700">
                        Is Neutered / Spayed
                    </label>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="button" variant="outline" onClick={onClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={mutation.isPending}>
                        Add Pet
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
