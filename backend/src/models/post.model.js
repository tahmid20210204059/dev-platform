const pool = require("../config/db");

const createPost = async ({ authorId, title, body }) => {
  const result = await pool.query(
    `
    INSERT INTO posts (author_id, title, body)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [authorId, title, body]
  );

  return result.rows[0];
};

const getAllPosts = async () => {
  const result = await pool.query(
    `
    SELECT 
      posts.*,
      users.name AS author_name
    FROM posts
    JOIN users ON users.id = posts.author_id
    ORDER BY posts.created_at DESC
    `
  );

  return result.rows;
};

const getPostById = async (id) => {
  const result = await pool.query(
    `
    SELECT 
      posts.*,
      users.name AS author_name
    FROM posts
    JOIN users ON users.id = posts.author_id
    WHERE posts.id = $1
    `,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById
};