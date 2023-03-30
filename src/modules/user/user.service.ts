import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { User } from './user.entity';
import { SALT_OR_ROUNDS } from '../auth/auth.constants';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async getAll() {
        try {
            const res = await this.userRepository.find();
            return {
                status: HttpStatus.OK,
                message: 'Success get users',
                data: res,
            };
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOne({
            where: { id: id },
        });
        return user;
    }

    async findByUsername(username: string) {
        const user = await this.userRepository.findOne({ where: { username } });
        return user;
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = this.userRepository.create({
                ...createUserDto,
            });
            const res = await this.userRepository.save(newUser);
            return {
                status: HttpStatus.CREATED,
                message: 'User created',
                data: res,
            };
        } catch (error) {
            throw new HttpException(
                'Username is already taken',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        try {
            let hashPassword;
            if (updateUserDto.password) {
                hashPassword = await bcrypt.hash(
                    updateUserDto.password,
                    SALT_OR_ROUNDS,
                );
            }
            const res = await this.userRepository.update(id, {
                ...updateUserDto,
                ...(hashPassword && { password: hashPassword }),
            });
            if (res.affected === 1) {
                return {
                    status: HttpStatus.CREATED,
                    message: 'User has been updated',
                };
            }
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            const res = await this.userRepository.delete(id);
            if (res.affected === 1) {
                return {
                    message: 'User has been deleted',
                    status: HttpStatus.CREATED,
                };
            }
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw error;
        }
    }
}
