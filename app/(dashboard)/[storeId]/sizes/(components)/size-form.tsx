"use client";

import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
import { Size } from "@prisma/client";

import DeleteModal from "@/components/modals/delete-modal";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";

interface SizesForm {
  sizeItem: Size | null; //if there is no category initially
}

const sizesFormSchema = z.object({
  name: z.string().min(2).max(50),
  value: z.string(),
});

export type sizesFormType = z.infer<typeof sizesFormSchema>;

const SizesForm: React.FC<SizesForm> = ({ sizeItem }) => {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  //check to see if there is data
  const formTitle = sizeItem ? "Edit Size" : "Create Size";
  const formDesc = "This is the title of your size. Be unique!";
  const toastMsg = sizeItem ? "Size updated." : "Size created.";
  const formAction = sizeItem ? "Save changes" : "Create";

  // 1. Define your form.
  const form = useForm<z.infer<typeof sizesFormSchema>>({
    resolver: zodResolver(sizesFormSchema),
    defaultValues: sizeItem || {
      name: "",
      value: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof sizesFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (!sizeItem) {
        await axios.post(`/api/${params.storeId}/sizes`, values);
      } else {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          values
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success(`${toastMsg}`);
    } catch (error) {
      toast.error("Error submiting.");
    }
  }
  async function onDelete() {
    try {
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success("Size deleted succesfully.");
    } catch (error) {
      console.log(error);
    }
  }

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
          {sizeItem && (
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name for your Size.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the value of your Size.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default SizesForm;
