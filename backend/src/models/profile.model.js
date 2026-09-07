const pool = require("../config/db");

const createProfile = async ({
  userId,
  bio,
  skills,
  experiences
}) => {
  const result = await pool.query(
    `
    INSERT INTO profiles
    (user_id, bio, skills, experiences)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      userId,
      bio,
      skills,
      experiences
    ]
  );

  return result.rows[0];
};


const updateProfile = async ({
  userId,
  bio,
  skills,
  experiences
}) => {
  const result = await pool.query(
    `
    UPDATE profiles
    SET
      bio = $1,
      skills = $2,
      experiences = $3,
      updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $4
    RETURNING *
    `,
    [
      bio,
      skills,
      experiences,
      userId
    ]
  );

  return result.rows[0];
};


const getProfileByUserId = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      profiles.*,
      users.name,
      users.email
    FROM profiles
    JOIN users
      ON users.id = profiles.user_id
    WHERE users.id = $1
    `,
    [userId]
  );

  return result.rows[0];
};


module.exports = {
  createProfile,
  updateProfile,
  getProfileByUserId
};