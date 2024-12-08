import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1733694535274 implements MigrationInterface {
    name = 'Init1733694535274';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear la tabla "user" en el esquema "core"
        await queryRunner.query(`
            CREATE TABLE "core"."user" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "age" integer NOT NULL,
                "profileId" integer,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "core"."user"."name" IS 'Nombre del usuario';
            COMMENT ON COLUMN "core"."user"."email" IS 'Correo del usuario';
            COMMENT ON COLUMN "core"."user"."age" IS 'Edad del usuario';
        `);

        // Crear la tabla "user_profile" en el esquema "core"
        await queryRunner.query(`
            CREATE TABLE "core"."user_profile" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "code" character varying(255) NOT NULL,
                "name" character varying(255) NOT NULL,
                CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "core"."user_profile"."code" IS 'Código de perfil';
            COMMENT ON COLUMN "core"."user_profile"."name" IS 'Nombre del perfil';
        `);

        // Agregar la clave foránea "profileId" en la tabla "user" que referencia a "user_profile"
        await queryRunner.query(`
            ALTER TABLE "core"."user"
            ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616"
            FOREIGN KEY ("profileId") REFERENCES "core"."user_profile"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        // Insertar valores iniciales en la tabla "user_profile"
        await queryRunner.query(`
            INSERT INTO "core"."user_profile" ("code", "name") VALUES
            ('ADMIN', 'Administrador'),
            ('USER', 'Usuario');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar la clave foránea "profileId" de la tabla "user"
        await queryRunner.query(`ALTER TABLE "core"."user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);

        // Eliminar la tabla "user_profile"
        await queryRunner.query(`DROP TABLE "core"."user_profile"`);

        // Eliminar la tabla "user"
        await queryRunner.query(`DROP TABLE "core"."user"`);
    }
}
