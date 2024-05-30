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
import { Color } from "@prisma/client";

import DeleteModal from "@/components/modals/delete-modal";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";

interface ColorsForm {
  colorItem: Color | null; //if there is no category initially
}

const colorsFormSchema = z.object({
  name: z.string().min(2).max(50),
  value: z.string().min(4).regex(/^#/, {
    message: "String must be a valid hex code.",
  }),
});

export type colorsFormType = z.infer<typeof colorsFormSchema>;

const ColorForm: React.FC<ColorsForm> = ({ colorItem }) => {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  //check to see if there is data
  const formTitle = colorItem ? "Edit Color" : "Create Color";
  const formDesc = "This is the title of your Color. Be unique!";
  const toastMsg = colorItem ? "Color updated." : "Color created.";
  const formAction = colorItem ? "Save changes" : "Create";

  // 1. Define your form.
  const form = useForm<z.infer<typeof colorsFormSchema>>({
    resolver: zodResolver(colorsFormSchema),
    defaultValues: colorItem || {
      name: "",
      value: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof colorsFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (!colorItem) {
        await axios.post(`/api/${params.storeId}/colors`, values);
      } else {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          values
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(`${toastMsg}`);
    } catch (error) {
      toast.error("Error submiting.");
    }
  }
  async function onDelete() {
    try {
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.push(`/${params.storeId}/colors`);
      router.refresh();
      toast.success("Color deleted succesfully.");
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
          {colorItem && (
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-10 items-center justify-between max-w-2xl flex-wrap "
          >
            <div className="flex  gap-9">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="hero-blue" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name for your Color.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <div className="flex flex-row items-center gap-4">
                        <Input placeholder="#011f4b" {...field} />
                        <div
                          className="rounded-full h-5 w-7 border"
                          style={{ backgroundColor: field.value }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      This is the value of your Color.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default ColorForm;
