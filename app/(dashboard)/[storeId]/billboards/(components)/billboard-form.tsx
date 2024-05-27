"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Billboard } from "@prisma/client";
import React, { useState } from "react";
import DeleteModal from "@/components/modals/delete-modal";
import { Trash } from "lucide-react";
import ApiAlert from "@/components/api-alert";
import ImageUploader from "@/components/img-uploader";

interface BillboardFormProps {
  billboard: Billboard | null;
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  imgUrl: z.string(),
});

const BillboardForm: React.FC<BillboardFormProps> = ({ billboard }) => {
  const [isOpen, setIsOpen] = useState(false);
  //check to see if there is data
  const formTitle = billboard ? "Edit billboard" : "Create billboard";
  const formDesc = billboard
    ? "This is the title of your billboard. Be unique!"
    : "This is the title of your billboard. Be unique!";
  const toastMsg = billboard ? "Billboard updated." : "Billboard created.";
  const formAction = billboard ? "Save changes" : "Create";

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: billboard || {
      title: "",
      imgUrl: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  async function onDelete() {}
  return (
    <>
      <DeleteModal
        title={"Are you sure?"}
        desc={"This action can't be undone."}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        closeModal={() => setIsOpen(!isOpen)}
        handleDelete={onDelete}
      />
      <main className="flex flex-col gap-5">
        <header className="flex flex-row  items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{formTitle}</h1>
            <p className="text-sm font-normal">{formDesc}</p>
          </div>
          {billboard && (
            <Button
              type="button"
              variant={"destructive"}
              size={"icon"}
              onClick={() => setIsOpen(true)}
            >
              <Trash />
            </Button>
          )}
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>Background image</FormLabel>
                  </div>
                  <FormControl>
                    <ImageUploader
                      value={field.value ? [field.value] : []}
                      disabled={form.formState.isSubmitting}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormDescription>
                    Modify the title of your store. Be unique!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row items-center justify-between">
                      <FormLabel>Title</FormLabel>
                    </div>
                    <FormControl>
                      <Input placeholder={""} {...field} />
                    </FormControl>
                    <FormDescription>
                      Modify the title of your store. Be unique!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">{formAction}</Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default BillboardForm;
