import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Loader, QrCode, X } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { INewQrCodeResponse } from '@/lib/types'

interface INewQRCode {
  open: boolean;
  close: () => void;
}

export default function NewQRCode({ open, close }: INewQRCode) {
  const [title, setTitle] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const token = sessionStorage.getItem('token') as string;
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const config: AxiosRequestConfig = {
      url: "qrcode/new",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        title, siteUrl
      }
    }
    try {
      const response = await axios.request(config);
      const res = response.data as INewQrCodeResponse;
      if (response.status === 200 && !!res.success) {
        toast({
          className: 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          title: "Success!",
          description: "QR Code created successfully",
        });
        close();
        return;
      }
      toast({
        className: 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        title: "Error!",
        description: "There was an error creating your QR code. Try again",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      setLoading(false);
      if (err.status === 401) {
        toast({
          className: 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          title: "Authorization Error!",
          description: `Your current session has expired. Redirecting you to the login page...`
        });
        setTimeout(() => navigate("/auth/login"), 3000);
        return;
      }
      toast({
        className: 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        title: "500 Server Error!",
        description: "An error occurred on the server. Please wait for sometime and try again",
      });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={close}>
      <AlertDialogContent>
        <Button onClick={close} className='w-5 h-5 p-0.5 rounded absolute right-1 top-1'><X /></Button>
        <AlertDialogHeader>
          <AlertDialogTitle>Create QR Code</AlertDialogTitle>
          <AlertDialogDescription className='text-xs'>
            Create a new QR Code and share with your audience
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Card className="w-full mx-auto shadow-none border-0 pt-4">
          <CardContent className="px-0">
            <form className='space-y-6' onSubmit={submit} autoComplete='qrcode'>
              <div className="space-y-2">
                <Label htmlFor="qrc">Enter QR Code Title</Label>
                <Input
                  id="qrc"
                  placeholder="Enter QR code title or description"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Enter text or URL</Label>
                <Input
                  id="url"
                  placeholder="Enter text or URL"
                  required
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                />
              </div>
              <Button className="w-full" disabled={loading}>
                {loading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <QrCode className="w-4 h-4 mr-2" />}
                {loading ? "Generating" : "Generate"} QR Code
              </Button>
            </form>
          </CardContent>
        </Card>
      </AlertDialogContent>
    </AlertDialog>
  )
}
