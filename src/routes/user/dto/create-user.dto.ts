import { IsNotEmpty, MaxLength, MinLength } from "class-validator";



// Dto는 entity를 보고 작성하라
export class CreateUserDto{

    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;
    
    @MinLength(8)
    @IsNotEmpty()
    password: string;
    
    @MinLength(2)
    @IsNotEmpty()
    name: string;
}

// class-validator 라이브러리 참고하여 커스텀하게 만들 수 있다

// @IsIN(['Female', 'Male'])
// gender: string;
//
// @IsPhoneNumber('KR') // 나라마다 핸드폰 번호
// @IsEmail()