import axios, { AxiosRequestConfig } from 'axios';
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

interface IScanResult {
  success: boolean;
  url: string;
}

const Scan = () => {
  const location = useLocation().search;
  const [params,] = useSearchParams();
  const id = params.get("id");

  const scan = async (urlId: string) => {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `qrcode/scan?Id=${urlId}`,
    }
    try {
      const res = await axios.request(options);
      const data: IScanResult = res.data;
      if(data.success) {
        window.location.href = data.url;
        window.location.replace(data.url);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if(id) scan(id);
  }, [id]);

  return (
    <section className='h-screen grid place-items-center'>
      <div className='p-4'>
        {
          (location.trim() === '' || id?.trim() === '') &&
          <h3 className='text-2xl'>URL ID cannot be empty</h3>
        }
        {
          (location.trim().length > 1 && (id && id?.trim().length > 1))  &&
          <div>
            <h3><span className='text-2xl animate-pulse'>Scanning QR Code</span></h3>
            <p className='text-center animate-pulse'>Please wait...</p>
          </div>
        }
      </div>
    </section>
  )
}

export default Scan;
