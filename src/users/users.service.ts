/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = any;
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      email: 'example@test.com',
      password: 'changeme',
      role: 'ADMIN',
    },
    {
      id: 2,
      email: 'example1@test.com',
      password: 'guess',
      role: 'USER',
    },
  ];
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(email: string) {
    return this.users.find((user) => user.email === email);
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
