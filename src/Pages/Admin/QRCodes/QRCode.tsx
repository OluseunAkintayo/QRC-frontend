import { Button } from '@/components/ui/button';
import { IQRCode } from '@/lib/types';
import { Calendar, Download, Eye, Link as LinkIcon, PieChart, QrCode as QRCodeIcon, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import React from 'react';
import DeleteQrCode from './DeleteQrCode';
import { UseQueryResult } from '@tanstack/react-query';

interface IQRCodeComponent {
  code: IQRCode;
  query: UseQueryResult<IQRCode, Error>
}

const QRCode = ({ code, query }: IQRCodeComponent) => {
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <div className='bg-gray-50 p-6'>
        <div className='flex justify-between'>
          <div className='flex gap-8'>
            <a href={code.imageUrl} download="qr-code" target="_blank" className='relative group'>
              <QRCodeIcon className='w-[100px] h-[100px] shadow-lg border border-gray-100 rounded transition-all duration-500 group-hover:opacity-50' />
              <span className='absolute bg-gray-300/90 w-full h-full top-0 left-0 rounded grid place-items-center transition-all duration-500 opacity-0 group-hover:opacity-100'>
                <Download />
              </span>
            </a>
            <div className='flex flex-col gap-2'>
              <Link to={code.urlId}><h2 className='text-lg font-bold text-gray-800'>{code.title}</h2></Link>
              <p className='flex items-center gap-1'><LinkIcon className='h-4' /> <a href={code.siteUrl} className='text-gray-600 font-bold hover:text-gray-800' target='_blank'>{code.siteUrl}</a></p>
              <div className='flex gap-6'>
                <span className='flex items-center gap-1'>
                  <PieChart className='h-4' /> <span className='text-sm'>Scans {code.visitCount}</span>
                </span>
                <span className='flex items-center gap-1'>
                  <Calendar className='h-4' />
                  <span className='text-sm'>{dayjs(code.createdAt).format("D MMM YYYY h:mm A")}</span>
                </span>
              </div>
            </div>
          </div>
          <div className='flex gap-2'>
            <Button className='w-12 h-12 rounded-full p-0 shadow-lg' variant="outline" onClick={() => console.log(code)}><Eye className='w-5' /></Button>
            <Button className='w-12 h-12 rounded-full p-0 shadow-lg' variant="destructive" onClick={() => setDeleteModal(true)}><Trash2 className='w-5' /></Button>
          </div>
        </div>
      </div>
      {deleteModal &&
        <DeleteQrCode
          open={deleteModal}
          close={() => {
            setDeleteModal(false);
            query.refetch();
          }}
          data={code}
        />}
    </React.Fragment>
  )
}

export default QRCode;
