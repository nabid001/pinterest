"use server";

import { revalidatePath } from "next/cache";
import Pin from "../models/pin.model";
import SavePin from "../models/savePin.model";
import User from "../models/user.model";
import { connectToDatabase } from "../mongodb.connection";
import { CreateUserParams, SavePinProps, UpdateUserParams } from "@/lib/types";

export const getUserById = async (id: string) => {
  try {
    await connectToDatabase();

    if (!id) throw new Error("unauthorized");

    const user = await User.findOne({ _id: id }).populate({
      path: "savePin",
    });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw new Error(error as any);
  }
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

export const createSavePin = async ({ pinId, author, path }: SavePinProps) => {
  try {
    await connectToDatabase();

    if (!pinId || !author) {
      throw new Error("pinId and author are not verified");
    }

    const newSavePins = await SavePin.create({
      pinId,
      author,
    });

    await User.findByIdAndUpdate(
      { _id: author },
      { $push: { savePin: newSavePins } }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newSavePins));
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getSavePin = async () => {
  const savesOne = await SavePin.find().populate({
    path: "pinId",
  });

  return JSON.parse(JSON.stringify(savesOne));
};
