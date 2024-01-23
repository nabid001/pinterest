"use server";

import Pin from "../models/pin.model";
import User from "../models/user.model";
import { connectToDatabase } from "../mongodb.connection";

type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};
type UpdateUserParams = {
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();

    if (!clerkId) {
      throw new Error("User not found");
    }
    const userToDelete = await User.findOneAndDelete({ clerkId });
    return JSON.parse(JSON.stringify(userToDelete));
  } catch (error) {
    throw new Error(error as any);
  }
};
