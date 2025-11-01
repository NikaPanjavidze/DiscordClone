import bcrypt from "bcryptjs";
import { IUserDocument, User } from "../models/user.model";
import { IUser } from "../types/user.types";
import { LoginInput } from "../schemas/user.schemas";
import jwt from "jsonwebtoken";
import { BadRequestError, NotFoundError } from "../errors/customErrors";

export const createUser = async (data: IUser): Promise<IUserDocument> => {
  const { username, email, password } = data;

  //Check if user exists
  const doesUserExist = await User.exists({ email: email.toLowerCase() });

  if (doesUserExist) {
    throw new BadRequestError("A User with this email already exists");
  }

  //Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create user and save to database
  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  if (!user) throw new BadRequestError("User could not be created.");

  return user;
};

export const loginUser = async (
  data: LoginInput
): Promise<{ user: IUserDocument; token: string }> => {
  console.log(data);
  const { email, password } = data;

  // Find user by email
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );
  if (!user) throw new NotFoundError("Invalid credentials. Please try again.");

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new NotFoundError("Invalid credentials. Please try again.");

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  // Return user info + token
  return { user, token };
};
