"use server";

import bcrypt from "bcrypt";

const SALT_ROUNDS = 5; // Number of rounds to salt the password

// Function to salt and hash the password
export const saltAndHashPassword = async (
  password: string
): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};
