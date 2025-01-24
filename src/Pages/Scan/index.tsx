import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface IScanResult {
  success: boolean;
  url: string;
}

const Scan = () => {
  const location = useLocation();
  const id = location.search.slice(4);
  const [error, setError] = React.useState<AxiosError | null>(null);

  const scan = async (urlId: string) => {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `qrcode/scan?Id=${urlId}`,
    }
    try {
      const res = await axios.request(options);
      const data: IScanResult = res.data;
      if (data.success) {
        console.log(data);
        // window.location.href = data.url;
        window.location.replace(data.url);
      }
      return;
    } catch (err) {
      console.log(err);
      setError(err as AxiosError);
    }
  }

  React.useEffect(() => {
    if (id) scan(id);
  }, [id]);

  return (
    <section className='h-screen grid place-items-center'>
      <div className='p-4'>
        {
          (id.trim() === '' || id?.trim() === '') &&
          <h3 className='text-2xl'>URL ID cannot be empty</h3>
        }
        {error &&
          <h3 className='text-2xl text-destructive'>{error.message}</h3>
        }
      </div>
    </section>
  )
}

export default Scan;
