import { User } from '../../Entities/UserEntity';

export class GetUserResponse {
    id: number;

    name: string;

    email: string;

    age: number;

    created_at: Date;

    updated_at: Date;

    deleted_at: Date;

    constructor(user: User) {
        this.id = user.id ? user.id : null;
        this.name = user.getName() ? user.getName() : '';
        this.created_at = user.getCreatedAt() ? user.getCreatedAt() : null;
        this.updated_at = user.getUpdatedAt() ? user.getUpdatedAt() : null;
        this.deleted_at = user.getDeletedAt() ? user.getDeletedAt() : null;
    }
}
