import React from 'react'
import Header from '../Header';
import { Button } from '@/components/ui/button';
import NewQRCode from './NewQRCode';
import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import { IQRCodeResponse } from '@/lib/types';
import QRCode from './QRCode';

const QRCodes = () => {
  const [newCodeModal, setNewcodeModal] = React.useState<boolean>(false);
  const token = sessionStorage.getItem('token');
  const getQrCodes = async () => {
    const config: AxiosRequestConfig = {
      url: "qrcode/list",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    try {
      const res = await axios.request(config);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const query = useQuery({
    queryKey: ['qrcodes'],
    queryFn: getQrCodes
  });

  const qrCodesData: IQRCodeResponse = query.data;

  console.log({ qrCodesData });

  return (
    <>
      <Header />
      <section>
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <h2>QR Codes</h2>
            <div>
              <Button onClick={() => setNewcodeModal(true)}>New QR Code</Button>
            </div>
          </div>
        </div>
        <div className='p-4 grid gap-4'>
          <>
            {
              (query.isLoading && !query.data && !query.error) &&
              Array.from(Array(5).keys()).map(item => <Loading key={item} />)
            }
          </>
          <>
            {
              (!query.isLoading && query.data && !query.error) &&
              qrCodesData.data.map(item => <QRCode key={item.id} code={item} />)
            }
          </>
          <>
            {
              (!query.isLoading && !query.data && query.error) &&
              <div className='p-8'>
                <h2 className='text-md'>Error: Unable to load QR Codes at this time</h2>
              </div>
            }
          </>
        </div>
      </section>
      {newCodeModal && <NewQRCode open={newCodeModal} close={() => setNewcodeModal(false)} />}
    </>
  )
}

export default QRCodes;
