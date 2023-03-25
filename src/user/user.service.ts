import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async getAllUser() {
        const res = await this.userRepository.find();
        return {
            status: HttpStatus.OK,
            message: 'Success get users',
            data: res,
        };
    }

    async addUser(createUserDto: CreateUserDto) {
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

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        try {
            const res = await this.userRepository.update(id, {
                ...updateUserDto,
            });
            if (res.affected === 1) {
                return {
                    status: HttpStatus.CREATED,
                    message: 'User has been updated',
                };
            }
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'Bad Request',
            };
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id: string) {
        try {
            const res = await this.userRepository.delete(id);
            if (res.affected === 1) {
                return {
                    message: 'User has been deleted',
                    status: HttpStatus.CREATED,
                };
            }
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'Bad Request',
            };
        } catch (error) {
            throw error;
        }
    }
}
