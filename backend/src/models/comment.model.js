const pool = require("../config/db");

const createComment = async ({
  postId,
  authorId,
  parentCommentId,
  body
}) => {
  const result = await pool.query(
    `
    INSERT INTO comments 
    (post_id, author_id, parent_comment_id, body)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      postId,
      authorId,
      parentCommentId || null,
      body
    ]
  );

  return result.rows[0];
};


const getCommentsByPostId = async (postId) => {
  const result = await pool.query(
    `
    SELECT
      comments.*,
      users.name AS author_name
    FROM comments
    JOIN users 
      ON users.id = comments.author_id
    WHERE comments.post_id = $1
    ORDER BY comments.created_at DESC
    `,
    [postId]
  );

  return result.rows;
};


const getCommentById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM comments
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};


module.exports = {
  createComment,
  getCommentsByPostId,
  getCommentById
};