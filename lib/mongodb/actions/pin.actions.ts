"use server";

import { CreateCommentParams, CreatePinParams } from "@/lib/types";
import Pin from "../models/pin.model";
import { connectToDatabase } from "../mongodb.connection";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Comment from "../models/comment.model";

const populatePin = async (query: any) => {
  return query.populate({
    path: "author",
    model: User,
    select: "_id email clerkId username photo firstName lastName",
  });
};

const populateComment = async (query: any) => {
  return query.populate({
    path: "comments",
    model: Comment,
    select: "_id text author",
  });
  query
    .populate({
      path: "author",
      model: User,
      select: "_id email clerkId username photo firstName lastName",
    })
    .populate({
      path: "author",
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

    const pins = await Pin.findById({ _id: id })
      .populate({
        path: "author",
        model: User,
        select: "_id email clerkId username photo firstName lastName",
      })
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      });
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

export const createComment = async ({
  text,
  pinId,
  author,
  path,
}: CreateCommentParams) => {
  try {
    await connectToDatabase();

    const newComment = await Comment.create({
      text,
      author,
      pinId,
    });

    await Pin.findByIdAndUpdate(
      { _id: pinId },
      { $push: { comments: newComment } }
    );

    revalidatePath(path);
  } catch (error) {
    throw new Error(error as any);
  }
};
