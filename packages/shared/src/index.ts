export interface User {
    id: string;
    username: string;
    email: string;
}

export interface Pet {
    id: string;
    name: string;
    breed: string;
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
