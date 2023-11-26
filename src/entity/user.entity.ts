import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({ description:'유저 아이디', example:'admin' })
    @Column({ unique: true })
    username: string;

    @ApiProperty({ description:'비밀번호', example:'111111' })
    @Column({ select: false })
    password: string;

    @ApiProperty({ description:'이름', example:'홍길동' })
    @Column()
    name: string;

    @ApiProperty({ description:'작성한 게시글' })
    @OneToMany( () => Board, (board) => board.user )
    boards?:Board[];

    @Column({ select: false, nullable: true, insert: false, update: false })
    boardCount?: number; // service에서 User_boardCount로 매핑이된다
}

/**
 * User - Board Sequelize
 * 
 * static associate(db) {
 *   db.User.hasMany(db.Board)
 * }
 */