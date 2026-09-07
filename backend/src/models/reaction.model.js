const pool = require("../config/db");

const targetExists = async ({
  targetType,
  targetId
}) => {
  const table = targetType === "post" ? "posts" : "comments";
  const result = await pool.query(
    `SELECT 1 FROM ${table} WHERE id = $1`,
    [targetId]
  );

  return result.rowCount > 0;
};


const toggleReaction = async ({
  userId,
  targetType,
  targetId,
  type
}) => {

  const existing = await pool.query(
    `
    SELECT *
    FROM reactions
    WHERE user_id = $1
    AND target_type = $2
    AND target_id = $3
    `,
    [
      userId,
      targetType,
      targetId
    ]
  );


  if (existing.rows.length > 0) {

    const reaction = existing.rows[0];


    if (reaction.type === type) {

      await pool.query(
        `
        DELETE FROM reactions
        WHERE id = $1
        `,
        [reaction.id]
      );


      return {
        removed: true,
        type
      };
    }


    const updated = await pool.query(
      `
      UPDATE reactions
      SET type = $1
      WHERE id = $2
      RETURNING *
      `,
      [
        type,
        reaction.id
      ]
    );


    return {
      removed: false,
      reaction: updated.rows[0]
    };
  }


  const result = await pool.query(
    `
    INSERT INTO reactions
    (
      user_id,
      target_type,
      target_id,
      type
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      userId,
      targetType,
      targetId,
      type
    ]
  );


  return {
    removed: false,
    reaction: result.rows[0]
  };
};



const getReactionCounts = async ({
  targetType,
  targetId
}) => {

  const result = await pool.query(
    `
    SELECT

      COUNT(*) FILTER (
        WHERE type = 'like'
      ) AS likes,

      COUNT(*) FILTER (
        WHERE type = 'dislike'
      ) AS dislikes

    FROM reactions

    WHERE target_type = $1
    AND target_id = $2
    `,
    [
      targetType,
      targetId
    ]
  );


  return result.rows[0];
};



const getUserReaction = async ({
  userId,
  targetType,
  targetId
}) => {

  const result = await pool.query(
    `
    SELECT type
    FROM reactions
    WHERE user_id = $1
    AND target_type = $2
    AND target_id = $3
    `,
    [
      userId,
      targetType,
      targetId
    ]
  );


  return result.rows[0];
};



module.exports = {
  targetExists,
  toggleReaction,
  getReactionCounts,
  getUserReaction
};