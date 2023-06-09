import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/user/dtos/CreateUser.dto';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
import { SALT_OR_ROUNDS } from './auth.constants';

@Injectable()
export class AuthService {
    public saltOrRounds = SALT_OR_ROUNDS;

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    generateToken(user: any) {
        // payload is data that save in jwt
        const payload = { name: user.name, sub: user.id };
        return this.jwtService.sign(payload);
    }

    async login(user: any) {
        return {
            status: HttpStatus.OK,
            message: 'Login successfully',
            data: user,
            access_token: this.generateToken(user),
        };
    }

    async register(createUserDto: CreateUserDto) {
        try {
            const user = await this.userService.findByUsername(
                createUserDto.username,
            );
            if (user) {
                throw new HttpException(
                    'Username is already used',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const newUser = this.userRepository.create(createUserDto);
            const res = await this.userRepository.save(newUser);
            return {
                status: HttpStatus.CREATED,
                message: 'User created',
                data: res,
                access_token: this.generateToken(newUser),
            };
        } catch (error) {
            throw error;
        }
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password ?? '',
        );
        if (user && isPasswordMatch) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...rest } = user;
            return rest;
        }
        return null;
    }
}
