"use server";

import { CreatePinParams } from "@/lib/types";
import Pin from "../models/pin.model";
import { connectToDatabase } from "../mongodb.connection";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

const populatePin = async (query: any) => {
  return query.populate({
    path: "author",
    model: User,
    select: "_id email clerkId username photo firstName lastName",
  });
};

export const createPin = async ({
  image,
  title,
  description,
  link,
  author,
}: CreatePinParams) => {
  try {
    await connectToDatabase();

    const newPin = await Pin.create({
      image,
      title,
      description,
      link,
      author,
    });

    revalidatePath("/");

    return JSON.parse(JSON.stringify(newPin));
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getPins = async () => {
  try {
    await connectToDatabase();

    const pins = await Pin.find({});

    return JSON.parse(JSON.stringify(pins));
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getPinById = async (id: string) => {
  try {
    await connectToDatabase();

    if (!id) {
      console.log("id is not defined");
    }

    const pins = await populatePin(Pin.findById({ _id: id }));

    return JSON.parse(JSON.stringify(pins));
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deletePinByUserId = async (id: string) => {
  try {
    await connectToDatabase();

    const deletePin = await Pin.deleteOne({ _id: id });

    revalidatePath("/");

    return JSON.parse(JSON.stringify(deletePin));
  } catch (error) {
    throw new Error("failed to delete pin");
  }
};
