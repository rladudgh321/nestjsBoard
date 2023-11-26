import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Board } from 'src/entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board> 
  ) {}
  private boards = [
    {
      id: 3,
      name: 'name3',
      content: 'content3',
    },
    {
      id: 2,
      name: 'name2',
      content: 'content2',
    },
    {
      id: 1,
      name: 'name1',
      content: 'content1',
    },
  ];

  getFindIndexById(id: number) {
    return this.boards.findIndex((v) => v.id === id); // getFindIndex는  id에 해당하는 인덱스
  }

  getNextId() {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }

  async findAll() {
    return this.boardRepository.find();
  }

  async findOne(id: number) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    return board;
  }

  async create(data: CreateBoardDto) {
    return this.boardRepository.save(data);
  }

  async update(data, id: number) {
    const board = await this.boardRepository.findOneBy({
      id
    });
    return this.boardRepository.update(id, {
      ...data,
    })
  }

  async remove(id: number) {
    const board = await this.boardRepository.findOneBy({
      id
    });
    return this.boardRepository.remove(board);
  }
}
