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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Textarea } from "./ui/textarea";
import { InitialValues, PinFormSchema } from "@/lib/validation";
import UploadPhoto from "./UploadPhoto";
import { useState } from "react";
import {
  createPin,
  deletePin,
  updatePin,
} from "@/lib/mongodb/actions/pin.actions";
import { usePathname, useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { connectToDatabase } from "@/lib/mongodb/mongodb.connection";

type PinFormProps = {
  author: string;
  type: "Create" | "Update";
  pin?: any;
  pinId?: string | undefined;
};

const PinForm = ({ author, type, pin, pinId }: PinFormProps) => {
  const [photo, setPhoto] = useState("");

  const router = useRouter();

  const path = usePathname();

  const DefaultValues = pin && type === "Update" ? { ...pin } : InitialValues;

  const form = useForm<z.infer<typeof PinFormSchema>>({
    resolver: zodResolver(PinFormSchema),
    defaultValues: DefaultValues,
  });

  async function onSubmit(values: z.infer<typeof PinFormSchema>) {
    {
      if (type === "Create") {
        try {
          const newPin = await createPin({
            image: photo,
            title: values.title,
            description: values.description,
            link: values.link,
            author,
            createdBy: author,
          });

          if (newPin) {
            router.push("/");
            form.reset();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    {
      if (type === "Update") {
        try {
          const updatedPin = await updatePin({
            path,
            pin: { ...values },
            pinId: pin?._id,
          });

          if (updatedPin) {
            form.reset();
            router.push("/");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  <UploadPhoto setPhoto={setPhoto} photo={photo} />;

  const handlePinDeletion = async () => {
    try {
      const pinToDelete = await deletePin(pinId);

      if (pinToDelete) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid place-items-center">
        <div className="h-[380px] w-[300px] overflow-auto grid place-items-center rounded-lg bg-gray-400">
          {pin?.image && (
            <Image
              width={300}
              height={380}
              src={pin.image && pin.image}
              alt="uploaded-photo"
              className="h-full w-full object-cover overflow-hidden rounded-lg"
            />
          )}
          {type === "Create" && photo ? (
            <>
              <Image
                width={300}
                height={380}
                src={photo && photo}
                alt="uploaded-photo"
                className="h-full w-full object-fill rounded-lg"
              />
            </>
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

        {type === "Create" && (
          <>
            <span
              onClick={() => setPhoto("")}
              className="mt-3 cursor-pointer rounded-lg bg-slate-300 px-2 py-1 text-base text-gray-500 transition-colors hover:text-gray-600"
            >
              Remove image
            </span>
          </>
        )}
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
            <div className="flex gap-2 mt-5 items-center ">
              {type === "Update" && (
                <>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogDescription className="text-lg font-medium">
                          If you delete this pin, it will be gone forever.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handlePinDeletion()}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
              <Button type="submit" className="">
                {type === "Create" ? "Create" : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default PinForm;
