import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import jwt from 'jsonwebtoken';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async login(data: LoginUserDto) {
        const { username, password } = data;

        const user = await this.userRepository.findOneBy({
            username,
        });
        if(!user) throw new HttpException('Not_Found', HttpStatus.NOT_FOUND)

        const match = await compare(password, user.password);
        if(!match) throw new HttpException('Not_Found', HttpStatus.UNAUTHORIZED)

        const payload = { 
            username,
            name: user.name
        }

        const accessToken = jwt.sign(payload, 'wejfkl', {
            expiresIn:10,
            issuer:'kyh'
        });

        return { accessToken };
    }


    async createUser(data: CreateUserDto) {
        const { username, password, name } = data;
        const encryptPassword = await this.encryptedPassword(password);
        return this.userRepository.save({
            username,
            name,
            password: encryptPassword,
        });
    }

    async encryptedPassword(password: string) {
        const default_salt = 12;
        return await hash(password, default_salt);
    }

    // 게시물 갯수만 파악
    async getUser() {
        const qb = this.userRepository.createQueryBuilder();
        qb.addSelect((subQuery)=>{ // 기존의 query문 안에다가 select문 자체를 추가 한다는 의미
            return subQuery
                .select('count(id)')  // id를 센다
                .from(Board, 'Board') // Board 엔티티의 Board 테이블
                .where('Board.userId = User.id'); //위에 'Board'를 해줘야 여기서 매칭 시켜줄 수 있다
        }, 'User_boardCount') // 반환값 이름 정해주기
        return qb.getMany();
    }


    
    
}



/**
 *     async getUser() {
        return this.userRepository.find({
            relations: {    // include
                boards: true
            },
            select: {
                boards: {
                    id: true,
                }
            }
        });
    }
 * 
 */
/**
 * 
 *  class 에서 this는 키를 의미함
 *  class 기계 {
 *      constructor(구멍1. 구멍2){
    *      this.q = 구멍1;
    *      this.w = 구멍2
 *      }
 * }
 * 
 * const a = new 기계('strike', 'helllo');
 * 
 * const a  = {
 *  q: 'strike',
 *  w: 'helllo
 * }
 * 
 * 
 * 
 * 
 * 
 * 
 * 프로토 타입은 유전자
 * 프로토타입은 기계 유전자
 * 
 * 프로토타입을 사용하면 자식이 끌어다 쓴다
 * 
 * 생성자에는 자식이 직접 가지고 있지만 프로토타입에 정의하면 부모만 가지고 자식들은 끌어다 슨다
 * 
 * 
 * 
 * 우선순위
 * 
 * 인스턴스 객체에 접근하면
 * 1. 생성자로부터 먼저 찾고
 * 2. 없으면 프로토타입에서 찾는다
 * 
 * 
 * 콜백함수
 * 함수에 파라미터로 들어가는 함수
 * 순차적으로 실행하고 싶을 때 사용
 */

// const func = (func1) => {
//     console.log('1')
//     func1 = () => {
//         console.log('2');
//     }
// }