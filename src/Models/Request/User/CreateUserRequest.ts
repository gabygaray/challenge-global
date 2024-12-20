import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserRequest {
    @ApiProperty({
        example: 'Gabriel Garay',
        description: 'Nombre del usuario',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'gabygaray100@gmail.com',
        description: 'Correo del usuario',
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        example: 30,
        description: 'Edad del usuario',
    })
    @IsNotEmpty()
    @IsInt()
    age: number;

    @ApiProperty({
        example: 'USER',
        description: 'Código del perfil del usuario',
        default: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    profileCode: string;

    public constructor(name: string, email: string, age: number, profileCode: string) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.profileCode = profileCode;
    }
}
