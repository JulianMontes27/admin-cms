import axios from "axios";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "./modal";

import { formSchema } from "@/lib/form-schema";
import type { Form as CreateStore } from "@/lib/form-schema";
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
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

const StoreModal = () => {
  const storeModal = useStoreModal();

  // 1. Define your form.
  const form = useForm<CreateStore>({
    resolver: zodResolver(formSchema), //validate with zod
    defaultValues: {
      title: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: CreateStore) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      //call route handler (this runs on the server)
      const res = await axios.post("/api/stores", values);
      toast.success("store created succesfully!", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }
  return (
    <Modal
      title={"Create a store"}
      desc={"Create a new store to manage"}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ecommerce store"
                    disabled={form.formState.isSubmitting}
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the title of your store.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant={"outline"}
              disabled={form.formState.isSubmitting}
              onClick={storeModal.onClose}
              className="border-none"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default StoreModal;
