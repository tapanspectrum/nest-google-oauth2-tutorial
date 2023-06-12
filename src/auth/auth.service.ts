import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userrepo: Repository<User>){

  }

  async validateUser(userDetails: CreateAuthDto) {
    console.log('userDetails', userDetails);
    const finduser = await this.userrepo.findOne({
      where: {
        email: userDetails.email
      }
    });
    if(finduser){
      return finduser
    }else{
      const newuser = this.userrepo.create(userDetails);
      this.userrepo.save(newuser);
    }
  }

  async findUser(id: number){
    const user = this.userrepo.find({
      where:{
        id
      }
    });
    return user;
  } 

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
