"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "./ui/textarea";
import { InitialValues, PinFormSchema } from "@/lib/validation";
import UploadPhoto from "./UploadPhoto";
import { useState } from "react";
import { createPin } from "@/lib/mongodb/actions/pin.actions";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

const PinForm = ({ author }: { author: string }) => {
  const [photo, setPhoto] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof PinFormSchema>>({
    resolver: zodResolver(PinFormSchema),
    defaultValues: InitialValues,
  });

  async function onSubmit(values: z.infer<typeof PinFormSchema>) {
    await createPin({
      image: photo,
      title: values.title,
      description: values.description,
      link: values.link,
      author,
    });

    router.push("/");
  }

  <UploadPhoto setPhoto={setPhoto} photo={photo} />;

  return (
    <>
      <div className="grid place-items-center">
        <div className="h-[380px] w-[300px] overflow-auto grid place-items-center rounded-lg bg-gray-400">
          {photo ? (
            <Image
              width={300}
              height={380}
              src={photo && photo}
              alt="uploaded-photo"
              className="h-full w-full object-fill rounded-lg"
            />
          ) : (
            <CldUploadButton
              options={{ sources: ["local"] }}
              uploadPreset="pinboard"
              onUpload={(results: any): void => {
                setPhoto(results.info.secure_url);
              }}
            />
          )}
        </div>
        <span
          onClick={() => setPhoto("")}
          className="mt-3 cursor-pointer rounded-lg bg-slate-300 px-2 py-1 text-base text-gray-500 transition-colors hover:text-gray-600"
        >
          Remove image
        </span>
      </div>
      <div className="px-4 sm:px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-3 py-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="block text-sm font-medium text-slate-600">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 w-full rounded-md border p-2 focus:outline-slate-200"
                      placeholder="Add a title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel className="block text-sm font-medium text-slate-600">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="mt-1 w-full rounded-md border p-2 focus:outline-slate-200"
                      placeholder="Add a detailed description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel className="block text-sm font-medium text-gray-600">
                    Link
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 w-full rounded-md border p-2 focus:outline-slate-200"
                      placeholder="Add a link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default PinForm;
