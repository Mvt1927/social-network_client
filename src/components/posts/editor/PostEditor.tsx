/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import UserAvatar from "@/components/UserAvatar";
import { useAuthStore } from "@/stores";
import { ClipboardEvent, use, useEffect, useRef, useState } from "react";
// import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LoadingButton from "@/components/LoadingButton";
import { ImageIcon, Loader2, X } from "lucide-react";
import Placeholder from "@tiptap/extension-placeholder";
import useMediaUpload, { Attachment } from "./useMediaUpload";
import { useSubmitPostMutation } from "./mutations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useDropzone } from "@uploadthing/react";
import { Card } from "@/components/ui/card";
// import EditorToolbar from "@/components/rich-text/toolbar/editor-toolbar";
import { TextAreaComponent } from "@/components/TextAreaComponent";
import { useEditor } from "@tiptap/react";
import { ScrollBarStyle } from "@/components/ui/scroll-bar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { url } from "inspector";
import { convertStringToMediaType } from "@/lib/types";
import { mediaSchema } from "@/dtos/media.dto";

export default function PostEditor() {
  const { user } = useAuthStore();

  const mutation = useSubmitPostMutation();

  const {
    startUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset: resetMediaUploads,
  } = useMediaUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  });

  const { onClick, ...rootProps } = getRootProps();

  const [input, setInput] = useState("");

  function onSubmit() {
    const inputAttachments = attachments.map(({ data }) => {
      const attachment = mediaSchema.parse({
        url: data?.url,
        type: convertStringToMediaType(data?.type),
      })

      return attachment;
    });

    mutation.mutate(
      {
        content: input,
        attachments: inputAttachments,
      },
      {
        onSuccess: () => {
          setInput("");
          resetMediaUploads();
        },
      },
    );

    console.log(attachments);
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const files = Array.from(e.clipboardData.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile()) as File[];
    startUpload(files);
  }

  return (
    <Card>
      <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm  ">
        <div className="flex gap-5">
          <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
          <div {...rootProps} className="flex-1">
            <TextAreaComponent
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={cn(isDragActive && "border-dashed")}
              onPaste={onPaste}
              disableBranding
              autosuggestionsConfig={{
                textareaPurpose: "Assist me in replying to this email thread. Remember all important details",
                chatApiConfigs: {
                },
              }} />
            <input {...getInputProps()} />
          </div>
        </div>
        {!!attachments.length && (
          <AttachmentPreviews
            attachments={attachments}
            removeAttachment={removeAttachment}
          />
        )}
        <div className="flex items-center justify-end gap-3">
          {isUploading && (
            <>
              <span className="text-sm">{uploadProgress ?? 0}%</span>
              <Loader2 className="size-5 animate-spin text-primary" />
            </>
          )}
          <AddAttachmentsButton
            onFilesSelected={startUpload}
            disabled={isUploading || attachments.length >= 5}
          />
          <LoadingButton
            onClick={onSubmit}
            loading={mutation.isPending}
            disabled={!input.trim() || isUploading}
            className="min-w-20"
          >
            Post
          </LoadingButton>
        </div>
      </div>
    </Card>
  );
}

interface AddAttachmentsButtonProps {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

function AddAttachmentsButton({
  onFilesSelected,
  disabled,
}: AddAttachmentsButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-primary hover:text-primary"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon size={20} />
      </Button>
      <input
        type="file"
        accept="image/*, video/*"
        multiple
        ref={fileInputRef}
        className="sr-only hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) {
            onFilesSelected(files);
            e.target.value = "";
          }
        }}
      />
    </>
  );
}

interface AttachmentPreviewsProps {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}

function AttachmentPreviews({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) {

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
  
  }, [api, attachments.length])

  useEffect(() => {
    if (!api) {
      return
    }
    api.scrollTo(attachments.length - 1 , true)
    
  }, [attachments.length, api])

  useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel
      setApi={setApi}
    >
      <CarouselContent>
        {attachments.map((attachment, index) => (
          <CarouselItem key={index}>
            <AttachmentPreview
              key={attachment.file.name}
              attachment={attachment}
              onRemoveClick={() => removeAttachment(attachment.file.name)}
            />
          </CarouselItem>
        ))}

      </CarouselContent>
      <div className="py-2 text-center text-sm text-muted-foreground">
        File {current} of {attachments.length}
      </div>
    </Carousel>
  );
}

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemoveClick: () => void;
}

function AttachmentPreview({
  attachment: { file, isUploading },
  onRemoveClick,
}: AttachmentPreviewProps) {
  const src = URL.createObjectURL(file);

  return (
    <div
      className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
    >
      {file.type.startsWith("image") ? (
        <Image
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      ) : (
        <video controls className="size-fit max-h-[30rem] rounded-2xl">
          <source src={src} type={file.type} />
        </video>
      )}
      {!isUploading && (
        <button
          onClick={onRemoveClick}
          className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
