import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/entities/userinfo.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class UserInfoAggregate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }
  /**
   * User 리스트 조회
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  /**
   * 특정 유저 조회
   * @param id
   */
  findOne(user: string): Promise<User> {
    return this.userRepository.findOne({ user: user });
  }
  /**
   * 유저 저장
   * @param user
   */
  async saveUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
  /**
   * 유저 삭제
   */
  async deleteUser(user: string): Promise<void> {
    await this.userRepository.delete({ user: user });
  }
}
