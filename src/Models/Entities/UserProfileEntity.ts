import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GenericTable } from './GenericTable';
import { User } from './UserEntity';

@Entity({ schema: 'core', name: 'user_profile' })
export class UserProfile extends GenericTable {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false, length: 255, comment: 'Código de perfil' })
    private code: string;

    @Column({ nullable: false, length: 255, comment: 'Nombre del perfil' })
    private name: string;

    @OneToMany(() => User, (user) => user.profile)
    public users: User[];

    public getId(): number {
        return this.id;
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getUsers(): User[] {
        return this.users;
    }

    public setUsers(users: User[]): void {
        this.users = users;
    }
}
