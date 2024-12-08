import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1733615151020 implements MigrationInterface {
    name = 'Init1733615151020';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear tabla "user_profile" en el esquema "core"
        await queryRunner.query(`
            CREATE TABLE "core"."user_profile" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "code" character varying(255) NOT NULL,
                "name" character varying(255) NOT NULL,
                "user_id" integer,
                CONSTRAINT "REL_eee360f3bff24af1b689076520" UNIQUE ("user_id"),
                CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "core"."user_profile"."code" IS 'Código de perfil';
            COMMENT ON COLUMN "core"."user_profile"."name" IS 'Nombre del perfil';
        `);

        // Crear tabla "user" en el esquema "core"
        await queryRunner.query(`
            CREATE TABLE "core"."user" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "age" integer NOT NULL,
                "profile_id" integer,
                CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b" UNIQUE ("profile_id"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "core"."user"."name" IS 'Nombre del usuario';
            COMMENT ON COLUMN "core"."user"."email" IS 'Correo del usuario';
            COMMENT ON COLUMN "core"."user"."age" IS 'Edad del usuario';
        `);

        // Añadir clave foránea a "user_profile" referenciando a "user"
        await queryRunner.query(`
            ALTER TABLE "core"."user_profile"
            ADD CONSTRAINT "FK_eee360f3bff24af1b6890765201"
            FOREIGN KEY ("user_id") REFERENCES "core"."user"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        // Añadir clave foránea a "user" referenciando a "user_profile"
        await queryRunner.query(`
            ALTER TABLE "core"."user"
            ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"
            FOREIGN KEY ("profile_id") REFERENCES "core"."user_profile"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar clave foránea de "user"
        await queryRunner.query(`ALTER TABLE "core"."user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);

        // Eliminar clave foránea de "user_profile"
        await queryRunner.query(`ALTER TABLE "core"."user_profile" DROP CONSTRAINT "FK_eee360f3bff24af1b6890765201"`);

        // Eliminar tabla "user"
        await queryRunner.query(`DROP TABLE "core"."user"`);

        // Eliminar tabla "user_profile"
        await queryRunner.query(`DROP TABLE "core"."user_profile"`);
    }
}
