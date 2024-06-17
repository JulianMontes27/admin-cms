"use client";

import axios from "axios";

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
import { Trash } from "lucide-react";

import { useState } from "react";

import DeleteModal from "@/components/modals/delete-modal";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";

import { Collage, CollageImage } from "@prisma/client";

import { ImageUploader } from "@/components/img-uploader";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  desc: z.string().min(1),
  collageImages: z.object({ url: z.string() }).array(),
});

interface CollageFormProps {
  collage: (Collage & { collageImages: CollageImage[] }) | null;
}

const CollageForm: React.FC<CollageFormProps> = ({ collage }) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  //check to see if there is data
  const formTitle = collage ? "Edit collage" : "Create collage";
  const formDesc = "This is the title of your collage. Be unique!";
  const toastMsg = collage ? "Collage updated." : "Collage created.";
  const formAction = collage ? "Save changes" : "Create";

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: collage || {
      name: "",
      desc: "",
      collageImages: [],
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!collage?.id) {
        await axios.post(`/api/${params.storeId}/collages`, values);
      }
      if (collage) {
        await axios.patch(
          `/api/${params.storeId}/collages/${collage.id}`,
          values
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/collages`);
      toast.success(toastMsg);
    } catch (error) {
      toast.error("Error submiting.");
    }
  }

  async function onDelete() {
    try {
      await axios.delete(`/api/${params.storeId}/collages/${params.collageId}`);

      router.push(`/${params.storeId}/collages`);
      router.refresh();
      toast.success("Collage deleted succesfully.");
    } catch (error) {
      toast.error("Internal server error.");
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
          {collage && (
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <FormField
              control={form.control}
              name="collageImages"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>Images</FormLabel>
                  </div>
                  <FormControl>
                    <ImageUploader
                      value={field.value.map(
                        (collageImage) => collageImage.url
                      )}
                      disabled={form.formState.isSubmitting}
                      onChange={(url: string) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url: string) =>
                        field.onChange([
                          ...field.value.filter((curr) => curr.url !== url),
                        ])
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    The images that form your Collage.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder={""} {...field} />
                    </FormControl>
                    <FormDescription>The name of your Collage.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder={field.value} type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      The description of your Collage.
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

export default CollageForm;
