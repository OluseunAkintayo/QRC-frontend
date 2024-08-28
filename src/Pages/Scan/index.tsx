import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';


const Scan = () => {
  const location = useLocation().search;
  console.log(location)
  const [params,] = useSearchParams();
  const id = params.get("url-id");

  React.useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <section className='h-screen grid place-items-center'>
      <div className='p-4'>
        <h3><span className='text-2xl animate-pulse'>Scanning QR Code</span></h3>
        <p className='text-center animate-pulse'>Please wait...</p>
      </div>
    </section>
  )
}

export default Scan;
