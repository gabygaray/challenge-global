import { Client } from '../../Entities/ClientEntity';

export class GetClientResponse {
    id: number;

    name: string;

    created_at: Date;

    updated_at: Date;

    deleted_at: Date;

    constructor(client: Client) {
        this.id = client.id ? client.id : null;
        this.name = client.getName() ? client.getName() : ' ' || null;
        this.created_at = client.createdAt ? client.createdAt : null;
        this.updated_at = client.updatedAt ? client.updatedAt : null;
        this.deleted_at = client.deletedAt ? client.deletedAt : null;
    }
}
