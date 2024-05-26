"use client";

import axios from "axios";

import { z } from "zod";
import { Store, User } from "@prisma/client";
import { useRouter } from "next/navigation";

import { settingsFormSchema } from "@/lib/settings-form-schema";
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

interface SettingsFormProps {
  user: User;
  store: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ user, store }) => {
  const router = useRouter();
  if (!user) {
    router.push("/api/auth/signin");
  }
  // 1. Define your form.
  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      title: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof settingsFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await axios.put(`/api/update-settings/${store.id}`, values);
    const resData = res.data;
    window.location.assign(`/${resData.id}`); //full refresh
  }
  async function onDelete() {
    await axios.delete(`/api/update-settings/${store.id}`);
    window.location.assign("/"); //full refresh
  }
  return (
    <main>
      <header className="flex flex-row  items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <Button
          type="button"
          variant={"destructive"}
          size={"icon"}
          onClick={onDelete}
        >
          <Trash />
        </Button>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-between">
                  <FormLabel>Title</FormLabel>
                </div>
                <FormControl>
                  <Input placeholder={store.title} {...field} />
                </FormControl>
                <FormDescription>
                  Modify the title of your store. Be unique!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
};

export default SettingsForm;
