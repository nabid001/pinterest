"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommentFormParams, PinCommentParams } from "@/lib/types";
import { usePathname } from "next/navigation";
import { createComment } from "@/lib/mongodb/actions/pin.actions";
import Image from "next/image";
import Link from "next/link";
import { deleteComment } from "@/lib/mongodb/actions/comment.actions";

export const commentSchema = z.object({
  text: z.string().min(1),
});

const CommentForm = ({ author, pinId, comment }: CommentFormParams) => {
  const path = usePathname();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof commentSchema>) {
    await createComment({
      text: values.text,
      author,
      pinId,
      path,
    });

    form.reset();
  }

  const handleDeleteComment = async (id: string) => {
    await deleteComment({ id, path });
  };

  return (
    <>
      <div>
        {comment?.map((com: PinCommentParams) => (
          <div key={com?._id} className="flex mb-5 items-start gap-2">
            <Link href={`/profile/${com?.author?.username}`}>
              <Image
                src={com?.author?.photo}
                alt="user-photo"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </Link>
            <div className="flex flex-col items-start gap-2">
              <span className="">
                <Link href={`/profile/${com?.author?.username}`}>
                  <span className="mr-2 cursor-pointer font-medium text-black transition-colors hover:text-slate-800">
                    {com.author.username}
                  </span>
                </Link>
                {com.text}
              </span>
              <div className="flex gap-2">
                {com.author._id == author && (
                  <>
                    <span
                      className="text-sm cursor-pointer"
                      onClick={() => handleDeleteComment(com._id)}
                    >
                      Delete
                    </span>
                    <span className="text-sm">Edit</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Add a comment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default CommentForm;
