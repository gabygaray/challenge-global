import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserRequest {
    @ApiProperty({
        example: 'Gabriel Garay',
        description: 'Nombre del usuario',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        example: 'gabygaray100@gmail.com',
        description: 'Correo del usuario',
    })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({
        example: 30,
        description: 'Edad del usuario',
    })
    @IsOptional()
    @IsInt()
    age?: number;

    @ApiProperty({
        example: 'USER',
        description: 'Código del perfil del usuario',
        default: 'USER',
    })
    @IsOptional()
    @IsString()
    profileCode?: string;

    public constructor(name?: string, email?: string, age?: number, profileCode?: string) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.profileCode = profileCode;
    }
}
