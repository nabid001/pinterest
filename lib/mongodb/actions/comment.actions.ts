"use server";

import { revalidatePath } from "next/cache";
import Comment from "../models/comment.model";
import { connectToDatabase } from "../mongodb.connection";

export const getCommentById = async (id: string) => {
  try {
    await connectToDatabase();
    const comment = await Comment.find({ pinId: id }).populate(
      "author",
      "_id username photo clerkId"
    );

    return JSON.parse(JSON.stringify(comment));
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteComment = async ({
  id,
  path,
}: {
  id: string;
  path: string;
}) => {
  try {
    await connectToDatabase();

    await Comment.findByIdAndDelete(id);

    revalidatePath(path);
  } catch (error) {
    throw new Error(error as any);
  }
};
