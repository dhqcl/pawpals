import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto, AuthResponseDto } from '@petverse/shared';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.usersService.create({
            username: registerDto.username,
            email: registerDto.email,
            password_hash: hashedPassword,
        });

        const payload = { sub: user.id, username: user.username };
        return {
            accessToken: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar_url: user.avatar_url,
            },
        };
    }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        // Allow login with either email or username (field is named 'email' in DTO but treated as identifier)
        const user = await this.usersService.findByUsernameOrEmail(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password_hash);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, username: user.username };
        return {
            accessToken: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar_url: user.avatar_url,
            },
        };
    }
}
