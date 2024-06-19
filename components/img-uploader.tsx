"use client";

import { ImagePlusIcon, Trash } from "lucide-react";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { Button } from "./ui/button";

import { CldUploadWidget } from "next-cloudinary";

interface ImageUploaderProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChange,
  onRemove,
  value,
  disabled,
}) => {
  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);

  const onUploadSuccess = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;
  console.log(value.length);

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 sm:grid-cols-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[250px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt={"Image"}
              fill
              sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset={"sb9b8kpl"} onUpload={onUploadSuccess}>
        {({ open }) => {
          return (
            <Button
              type="button"
              variant={"secondary"}
              disabled={disabled}
              onClick={() => open()}
            >
              <ImagePlusIcon className="mr-2 h-4 2-4" />
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
