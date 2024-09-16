import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from 'lucide-react'
import { IQRCode } from "@/lib/types";
import axios, { AxiosRequestConfig } from "axios";
import { useToast } from "@/hooks/use-toast";

interface IDeleteQrCode {
  open: boolean;
  close: () => void;
  data: IQRCode;
}

export default function DeleteQrCode({ open, close, data }: IDeleteQrCode) {
  const token = sessionStorage.getItem("token") as string;
  const { toast } = useToast();

  const handleDelete = async () => {
    const config: AxiosRequestConfig = {
      url: `qrcode?Id=${data.id}`,
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    };
    try {
      await axios.request(config);
      toast({
        className: 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        title: "Success!",
        description: "QR Code created successfully",
      });
    } catch (error) {
      console.log(error);
      if(axios.isAxiosError(error)) {
        toast({
          className: 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          title: `Error ${error.code}`,
          description: error.message + ": " + "Unable to delete QR Code at this time, please check again later",
        });
      }
    }
    close();
  }

  return (
    <AlertDialog open={open} onOpenChange={close}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the QR code <span className="font-bold">{data.title}</span>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-start">
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          <Button type="button" variant="outline" onClick={close}>
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
