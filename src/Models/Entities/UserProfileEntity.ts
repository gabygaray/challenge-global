import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    public user: User;

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

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }
}
