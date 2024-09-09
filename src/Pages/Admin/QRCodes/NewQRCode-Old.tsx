import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { QrCode, Download, ArrowLeft, X } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface INewQRCode {
  open: boolean;
  close: () => void;
}

export default function NewQRCode_Old({ open, close }: INewQRCode) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [isGenerated, setIsGenerated] = useState(false)

  const handleGenerate = () => {
    if (title) setIsGenerated(true);
  }

  const handleDownload = () => {
    alert('Downloading QR code...');
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
          <CardContent className="space-y-4 px-0">
            {
              !isGenerated &&
              <>
                <div className="space-y-2">
                  <Label htmlFor="text">Enter QR Code Title</Label>
                  <Input
                    id="text"
                    placeholder="Enter QR code title or description"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text">Enter text or URL</Label>
                  <Input
                    id="text"
                    placeholder="Enter text or URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fgColor">Foreground Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="fgColor"
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-12 h-12 p-1 rounded-md"
                      />
                      <span className="text-sm text-muted-foreground">{fgColor}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bgColor">Background Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="bgColor"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-12 h-12 p-1 rounded-md"
                      />
                      <span className="text-sm text-muted-foreground">{bgColor}</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleGenerate} className="w-full" disabled={!title}>
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Code
                </Button>
              </>
            }
            
            {isGenerated && (
              <div className="mt-4 space-y-4">
                <button onClick={() => setIsGenerated(false)} className='flex items-center text-xs'><ArrowLeft className='h-4' /> <span>Back</span></button>
                <div className="flex justify-center">
                  <div
                    className="w-64 h-64 border-2 border-dashed rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: bgColor, borderColor: fgColor }}
                  >
                    <QrCode size={200} color={fgColor} />
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </AlertDialogContent>
    </AlertDialog>
  )
}