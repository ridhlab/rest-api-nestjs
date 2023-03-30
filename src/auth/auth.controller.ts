import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/CreateUser.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return {
            status: HttpStatus.OK,
            message: 'Login successfully',
            data: req.user,
        };
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }
}
