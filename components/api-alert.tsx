"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  desc: string;
  variant: "public" | "admin";
  className: string;
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert = ({
  title,
  desc,
  variant = "public",
  className,
}: ApiAlertProps) => {
  function onCopy() {
    navigator.clipboard.writeText(desc);
    toast.success("API route copied.");
  }
  return (
    <Alert className={className}>
      <Server size={15} />
      <AlertTitle className="flex items-center gap-x-4">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {desc}
        </code>
        <Button variant={"outline"} size={"icon"} onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
