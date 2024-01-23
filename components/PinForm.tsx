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

const PinForm = () => {
  const form = useForm<z.infer<typeof PinFormSchema>>({
    resolver: zodResolver(PinFormSchema),
    defaultValues: InitialValues,
  });

  async function onSubmit(values: z.infer<typeof PinFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormLabel className="block text-sm font-medium text-gray-600">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  className="mt-1 w-full rounded-md border p-2"
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
              <FormLabel className="block text-sm font-medium text-gray-600">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  className="mt-1 w-full rounded-md border p-2"
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
                  className="mt-1 w-full rounded-md border p-2"
                  placeholder="Add a link"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormLabel className="block text-sm font-medium text-gray-600">
                Tag
              </FormLabel>
              <FormControl>
                <Input
                  className="mt-1 w-full rounded-md border p-2"
                  placeholder="Add a tag"
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
  );
};

export default PinForm;
