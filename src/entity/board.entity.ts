import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, 
    UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Board {
    @PrimaryGeneratedColumn({ name: 'id' }) // 네임을 통해서 컬럼을 변경할 수 있다
    id: number;

    @ApiProperty({ description:'유저아이디', example:'bok0815' })
    @Column()
    userId: number;

    @ApiProperty({ description:'내용', example:'안녕하세요 내용입니다' })
    @Column()
    contents:string;

    @ApiProperty({ description:'수정일', example:'2023-11-25' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({ description:'생성일', example:'2023-11-25' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description:'유저정보'})
    @ManyToOne(()=> User)
    @JoinColumn({name:'userId'})
    user:User;
}