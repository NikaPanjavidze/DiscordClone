import bcrypt from "bcryptjs";
import { IUserDocument, User } from "../models/user.model";
import { IUser } from "../types/user.types";

export const createUser = async (data: IUser): Promise<IUserDocument> => {
  const { username, email, password } = data;

  //Check if user exists
  const doesUserExist = await User.exists({ email: email.toLowerCase() });

  if (doesUserExist) {
    throw new Error("A User with this email already exists");
  }

  //Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create user and save to database
  const user = await User.create({
    username,
    email: email.toLowerCase(),
    hashedPassword,
  });

  if (!user) throw new Error("User could not be created.");

  return user;
};
