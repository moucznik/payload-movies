import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "movies_genres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_movies_v_version_genres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "movies" ADD COLUMN "name" varchar;
  ALTER TABLE "movies" ADD COLUMN "url" varchar;
  ALTER TABLE "movies" ADD COLUMN "votes" numeric;
  ALTER TABLE "movies" ADD COLUMN "poster_id" integer;
  ALTER TABLE "movies" ADD COLUMN "overview" varchar;
  ALTER TABLE "movies" ADD COLUMN "tagline" varchar;
  ALTER TABLE "_movies_v" ADD COLUMN "version_name" varchar;
  ALTER TABLE "_movies_v" ADD COLUMN "version_url" varchar;
  ALTER TABLE "_movies_v" ADD COLUMN "version_votes" numeric;
  ALTER TABLE "_movies_v" ADD COLUMN "version_poster_id" integer;
  ALTER TABLE "_movies_v" ADD COLUMN "version_overview" varchar;
  ALTER TABLE "_movies_v" ADD COLUMN "version_tagline" varchar;
  DO $$ BEGIN
   ALTER TABLE "movies_genres" ADD CONSTRAINT "movies_genres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_movies_v_version_genres" ADD CONSTRAINT "_movies_v_version_genres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_movies_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "movies_genres_order_idx" ON "movies_genres" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "movies_genres_parent_id_idx" ON "movies_genres" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_movies_v_version_genres_order_idx" ON "_movies_v_version_genres" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_movies_v_version_genres_parent_id_idx" ON "_movies_v_version_genres" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "movies" ADD CONSTRAINT "movies_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_movies_v" ADD CONSTRAINT "_movies_v_version_poster_id_media_id_fk" FOREIGN KEY ("version_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "movies_poster_idx" ON "movies" USING btree ("poster_id");
  CREATE INDEX IF NOT EXISTS "_movies_v_version_version_poster_idx" ON "_movies_v" USING btree ("version_poster_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "movies_genres";
  DROP TABLE "_movies_v_version_genres";
  ALTER TABLE "movies" DROP CONSTRAINT "movies_poster_id_media_id_fk";
  
  ALTER TABLE "_movies_v" DROP CONSTRAINT "_movies_v_version_poster_id_media_id_fk";
  
  DROP INDEX IF EXISTS "movies_poster_idx";
  DROP INDEX IF EXISTS "_movies_v_version_version_poster_idx";
  ALTER TABLE "movies" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "movies" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "movies" DROP COLUMN IF EXISTS "votes";
  ALTER TABLE "movies" DROP COLUMN IF EXISTS "poster_id";
  ALTER TABLE "movies" DROP COLUMN IF EXISTS "overview";
  ALTER TABLE "movies" DROP COLUMN IF EXISTS "tagline";
  ALTER TABLE "_movies_v" DROP COLUMN IF EXISTS "version_name";
  ALTER TABLE "_movies_v" DROP COLUMN IF EXISTS "version_url";
  ALTER TABLE "_movies_v" DROP COLUMN IF EXISTS "version_votes";
  ALTER TABLE "_movies_v" DROP COLUMN IF EXISTS "version_poster_id";
  ALTER TABLE "_movies_v" DROP COLUMN IF EXISTS "version_overview";
  ALTER TABLE "_movies_v" DROP COLUMN IF EXISTS "version_tagline";`)
}
