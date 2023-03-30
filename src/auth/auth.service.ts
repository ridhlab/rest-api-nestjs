import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/CreateUser.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { SALT_OR_ROUNDS } from './auth.constants';

@Injectable()
export class AuthService {
    public saltOrRounds = SALT_OR_ROUNDS;

    constructor(
        private userService: UserService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async register(createUserDto: CreateUserDto) {
        try {
            const user = await this.userService.findByUsername(
                createUserDto.username,
            );
            if (user) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Username is already used',
                };
            }
            const newUser = this.userRepository.create(createUserDto);
            const res = await this.userRepository.save(newUser);
            return {
                status: HttpStatus.CREATED,
                message: 'User created',
                data: res,
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
