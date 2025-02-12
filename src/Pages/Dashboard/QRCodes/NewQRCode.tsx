import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface NewQRCodeProps {
  open: boolean;
  close: () => void;
}

const NewQRCode = ({ open, close }: NewQRCodeProps) => {
  const [url, setUrl] = React.useState('');
  const [title, setTitle] = React.useState('');
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => setUrl(event.target.value);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <AlertDialog open={open} onOpenChange={close}>
      <AlertDialogContent className="sm:max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            New QR Code
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4" id="new-qrcode">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={handleTitleChange} />
          </div>
          <div className="space-y-2">
            <label>URL</label>
            <Input value={url} onChange={handleUrlChange} />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button type="submit">Submit</Button>
            <Button type="button" variant="outline" onClick={close}>Cancel</Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default NewQRCode;
