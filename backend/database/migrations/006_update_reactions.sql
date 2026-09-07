-- Convert the original post-only reactions table without deleting its data.
-- Existing post_id values are migrated to target_type/target_id automatically.
-- Any rows that cannot be mapped must be migrated manually before adding NOT NULL constraints.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'reactions'
          AND column_name = 'post_id'
    ) THEN
        ALTER TABLE reactions
            ADD COLUMN IF NOT EXISTS target_type VARCHAR(20),
            ADD COLUMN IF NOT EXISTS target_id INTEGER;

        UPDATE reactions
        SET target_type = 'post',
            target_id = post_id
        WHERE target_type IS NULL
           OR target_id IS NULL;

        ALTER TABLE reactions
            ALTER COLUMN target_type SET NOT NULL,
            ALTER COLUMN target_id SET NOT NULL;

        ALTER TABLE reactions
            DROP CONSTRAINT IF EXISTS reactions_user_id_post_id_key;

        ALTER TABLE reactions
            DROP COLUMN post_id;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'reactions_target_type_check'
    ) THEN
        ALTER TABLE reactions
            ADD CONSTRAINT reactions_target_type_check
            CHECK (target_type IN ('post', 'comment'));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'reactions_type_check'
    ) THEN
        ALTER TABLE reactions
            ADD CONSTRAINT reactions_type_check
            CHECK (type IN ('like', 'dislike'));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'reactions_user_id_target_type_target_id_key'
    ) THEN
        ALTER TABLE reactions
            ADD CONSTRAINT reactions_user_id_target_type_target_id_key
            UNIQUE (user_id, target_type, target_id);
    END IF;
END $$;