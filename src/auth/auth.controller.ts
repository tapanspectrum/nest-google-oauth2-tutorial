import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { GoogleAuthGuard } from './utils/guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('login')
  @UseGuards(GoogleAuthGuard)
  findAll() {
    return this.authService.findAll();
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleredirect() {
    return this.authService.findAll();
  }

  @Get('status')
  getUserDeatsil(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return {
        msg: 'Authenticated'
      }
    } else {
      return {
        msg: 'Authenticatecation Fails'
      }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
