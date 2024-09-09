const Loading = () => {
  return (
    <div className='bg-gray-50 p-6'>
      <div className='flex gap-8 w-full justify-between'>
        <div className='animate-pulse bg-gray-300 h-[100px] aspect-square rounded' />
        <div className='flex flex-col gap-2 w-full'>
          <h2 className='w-full h-10 rounded animate-pulse bg-gray-300'></h2>
          <div className='h-5 rounded animate-pulse bg-gray-300' />
          <div className='h-5 rounded animate-pulse bg-gray-300' />
        </div>
      </div>
    </div>
  )
}

export default Loading;
