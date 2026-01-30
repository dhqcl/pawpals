export interface User {
    id: string;
    username: string;
    email: string;
    avatar_url?: string;
    bio?: string;
    created_at?: string;
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export interface Pet {
    id: string;
    nickname: string;
    avatar_url?: string;
    gender: Gender;
    birthday: string;
    is_neutered: boolean;
    breedId?: string;
    ownerId: string;
    metadata?: Record<string, any>;
    breed?: {
        id: string;
        name: string;
        species: string;
        example_image_url: string;
    };
}

export interface CreatePetDto {
    nickname: string;
    gender: Gender;
    birthday: string;
    is_neutered?: boolean;
    breedId: string;
}

export interface UpdateUserDto {
    avatar_url?: string;
    bio?: string;
}

export interface RegisterDto {
    username: string;
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface AuthResponseDto {
    accessToken: string;
    user: {
        id: string;
        username: string;
        email: string;
        avatar_url?: string;
    };
}
