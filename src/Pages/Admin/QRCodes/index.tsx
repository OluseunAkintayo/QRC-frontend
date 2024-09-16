import React from 'react'
import { Button } from '@/components/ui/button';
import NewQRCode from './NewQRCode';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import { IQRCodeResponse } from '@/lib/types';
import QRCode from './QRCode';
import AdminLayout from '../AdminLayout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const QRCodes = () => {
  const [newCodeModal, setNewcodeModal] = React.useState<boolean>(false);
  const token = sessionStorage.getItem('token');
  const [text, setText] = React.useState<string>("");
  const getQrCodes = async () => {
    const config: AxiosRequestConfig = {
      url: "qrcode/list",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    const res = await axios.request(config);
    return res;
    // try {
    // } catch (error) {
    //   console.log(error);
    //   return error;
    // }
  }
  const query = useQuery({
    queryKey: ['qrcodes'],
    queryFn: getQrCodes
  });

  const qrCodesData: IQRCodeResponse = query.data?.data;
  const queryError = query.error as AxiosError;

  return (
    <AdminLayout>
      <section>
        <div>
          <div className='flex gap-8 items-center justify-between'>
            <div className='relative w-full max-w-[300px]'>
              <Search className='h-4 absolute top-3 left-1' />
              <Input placeholder='Search...' className='pl-8 border-slate-900 focus-visible:border-transparent' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div>
              <Button onClick={() => setNewcodeModal(true)}>New QR Code</Button>
            </div>
          </div>
        </div>
        <div className=' mt-8 grid gap-4'>
          <>
            {
              (query.isLoading && !query.data && !query.error) &&
              Array.from(Array(5).keys()).map(item => <Loading key={item} />)
            }
          </>
          <>
            {
              (!query.isLoading && query.data && !query.error) &&
              qrCodesData.data
                .filter(item => {
                  if (text.trim().length === 0) return item;
                  if (item.title.toLowerCase().includes(text.toLowerCase())) return item;
                  if (item.siteUrl.toLowerCase().includes(text.toLowerCase())) return item;
                })
                .map(item => <QRCode key={item.id} code={item} query={query} />)
            }
          </>
          <>
            {
              (!query.isLoading && !query.data && queryError) && (
                queryError.status === 401 ? <Navigate to="/auth/login" /> :
                  <div className='p-8'>
                    <h2 className='text-md text-destructive'>Error {queryError.status}: Unable to load QR Codes at this time</h2>
                  </div>
              )
            }
          </>
        </div>
      </section>
      {newCodeModal && <NewQRCode open={newCodeModal} close={() => {
        setNewcodeModal(false);
        query.refetch();
      }} />}
    </AdminLayout>
  )
}

export default QRCodes;
