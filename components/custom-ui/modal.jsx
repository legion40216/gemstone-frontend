import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
export default function Modal({
    body,
    children,
    description,
    title,
    close,
    setClose,
    sizeLarge = false,
    titleBoolean
}) {

  return (
    <Dialog open={close} onOpenChange={setClose}>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className={`${sizeLarge ? "max-w-[40rem]" : ""}`}>
      { titleBoolean &&
        <DialogHeader>
        <DialogTitle><span className="text-primary">{title}</span></DialogTitle>
        <DialogDescription>
            {description}
        </DialogDescription>
        </DialogHeader>
        }
        <div>{body}</div>
    </DialogContent>
    </Dialog>
  )
}
