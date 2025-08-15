import jwt from "jsonwebtoken";

export const generateToken = (id, role) => {
 const JWT_SECRET = process.env.JWT_SECRET 
 const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
  try {
    const token = jwt.sign({ userId: id, role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return token;
  } catch (error) {
    console.error(error.message);
  }
};
