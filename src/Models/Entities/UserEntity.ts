import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GenericTable } from './GenericTable';
import { UserProfile } from './UserProfileEntity';

@Entity({ schema: 'core', name: 'user' })
export class User extends GenericTable {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false, length: 255, comment: 'Nombre del usuario' })
    private name: string;

    @Column({ nullable: false, length: 255, comment: 'Correo del usuario' })
    private email: string;

    @Column({ nullable: false, comment: 'Edad del usuario' })
    private age: number;

    @ManyToOne(() => UserProfile, (profile) => profile.users)
    public profile: UserProfile;

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getAge(): number {
        return this.age;
    }

    public setAge(age: number): void {
        this.age = age;
    }

    public getProfile(): UserProfile {
        return this.profile;
    }

    public setProfile(profile: UserProfile): void {
        this.profile = profile;
    }
}
