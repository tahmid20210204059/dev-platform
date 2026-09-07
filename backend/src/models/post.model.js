const pool = require("../config/db");


const createPost = async ({
  authorId,
  title,
  body,
  mediaUrl,
  mediaType
}) => {

  const result = await pool.query(
    `
    INSERT INTO posts
    (
      author_id,
      title,
      body,
      media_url,
      media_type
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      authorId,
      title,
      body,
      mediaUrl,
      mediaType
    ]
  );


  return result.rows[0];
};



const getAllPosts = async () => {

  const result = await pool.query(
    `
    SELECT
      posts.*,

      users.name AS author_name,


      COUNT(DISTINCT comments.id) AS comment_count,


      COUNT(DISTINCT CASE
        WHEN reactions.target_type = 'post'
        AND reactions.type = 'like'
        THEN reactions.id
      END) AS likes,


      COUNT(DISTINCT CASE
        WHEN reactions.target_type = 'post'
        AND reactions.type = 'dislike'
        THEN reactions.id
      END) AS dislikes,


      (
        COUNT(DISTINCT CASE
          WHEN reactions.target_type = 'post'
          AND reactions.type = 'like'
          THEN reactions.id
        END)

        -

        COUNT(DISTINCT CASE
          WHEN reactions.target_type = 'post'
          AND reactions.type = 'dislike'
          THEN reactions.id
        END)

        +

        COUNT(DISTINCT comments.id) * 2

      ) AS score


    FROM posts


    JOIN users
      ON users.id = posts.author_id


    LEFT JOIN comments
      ON comments.post_id = posts.id


    LEFT JOIN reactions
      ON reactions.target_id = posts.id
      AND reactions.target_type = 'post'


    GROUP BY
      posts.id,
      users.name


    ORDER BY
      score DESC,
      posts.created_at DESC
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

    JOIN users
      ON users.id = posts.author_id

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