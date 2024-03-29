import {
    IsString,
    MaxLength,
    IsNotEmpty,
    IsEmail,
    MinLength,
    Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements Readonly<CreateUserDto> {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(18)
    @MinLength(5)
    @Matches(/^[^\s]+(\s+[^\s]+)*$/)
    password: string;

    @ApiProperty()
    @MaxLength(30)
    @MinLength(3)
    @Matches(/^[a-zA-Z ]+$/)
    @IsString()
    firstName: string;

    @ApiProperty()
    @MaxLength(30)
    @MinLength(3)
    @Matches(/^[a-zA-Z ]+$/)
    @IsString()
    lastName: string;
}