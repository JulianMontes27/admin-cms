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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Billboard, Category } from "@prisma/client";
import { useState } from "react";
import DeleteModal from "@/components/modals/delete-modal";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface CategoryForm {
  category: Category | null; //if there is no category initially
  billboards: Billboard[];
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  billboardId: z.string(),
});

const BillboardForm: React.FC<CategoryForm> = ({ category, billboards }) => {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  //check to see if there is data
  const formTitle = category ? "Edit category" : "Create category";
  const formDesc = "This is the title of your category. Be unique!";
  const toastMsg = category ? "Category updated." : "Category created.";
  const formAction = category ? "Save changes" : "Create";

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: category || {
      title: "",
      billboardId: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (!category?.id) {
        await axios.post(`/api/${params.storeId}/categories`, values);
      }
      if (category) {
        await axios.patch(
          `/api/${params.storeId}/categories/${category.id}`,
          values
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success(`${toastMsg}`);
    } catch (error) {
      toast.error("Error submiting.");
    }
  }
  async function onDelete() {
    console.log("on delete");
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
          {category && (
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
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={form.formState.isSubmitting}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a billboard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage your categories here {""}
                    <Link href={`/${params.storeId}/categories`}>
                      Categories
                    </Link>
                    .
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row items-center justify-between">
                      <FormLabel>Category Title</FormLabel>
                    </div>
                    <FormControl>
                      <Input placeholder={""} {...field} />
                    </FormControl>
                    <FormDescription>
                      Modify the title of your category. Be unique!
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
