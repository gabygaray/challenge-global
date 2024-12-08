import { User } from '../../Entities/UserEntity';

export class GetUserResponse {
    id: number;

    name: string;

    email: string;

    age: number;

    profile: {
        id: number;
        code: string;
        name: string;
    };

    created_at: Date;

    updated_at: Date;

    deleted_at: Date;

    constructor(user: User) {
        this.id = user.id ? user.id : null;
        this.name = user.getName() ? user.getName() : '';
        this.email = user.getEmail() ? user.getEmail() : '';
        this.created_at = user.getCreatedAt() ? user.getCreatedAt() : null;
        this.updated_at = user.getUpdatedAt() ? user.getUpdatedAt() : null;
        this.deleted_at = user.getDeletedAt() ? user.getDeletedAt() : null;
        this.profile = {
            id: user.getProfile()?.id ? user.getProfile().id : null,
            code: user.getProfile()?.getCode() ? user.getProfile().getCode() : '',
            name: user.getProfile()?.getName() ? user.getProfile().getName() : '',
        };
    }
}
