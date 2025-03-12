"use server";

import bcrypt from "bcryptjs";

const SALT_ROUNDS = 5; // Number of rounds to salt the password

/**
 * Function to salt and hash the password
 */

export const saltAndHashPassword = async (
  password: string
): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw new Error("Error hashing password");
  }
};

/**
 * Function to compare two password and returns true if it's match
 */
export const isPasswordMatch = async (
  password: string,
  hashedPassword: string
) => {
  // const hashedPassword = await saltAndHashPassword(password);
  return await bcrypt.compare(password, hashedPassword);
};
