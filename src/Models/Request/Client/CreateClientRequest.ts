import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateClientRequest {
    @IsNotEmpty()
    @IsString()
    name: string;
}
