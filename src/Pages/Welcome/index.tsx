import { QrCode } from 'lucide-react'

const Welcome = () => {
  return (
    <section className='h-[100dvh] w-full grid place-items-center'>
      <div className='p-4'>
        <div className='flex flex-col items-center justify-center max-w-[500px] gap-4'>
          <p className='text-center text-xl'>Welcome to</p>
          <h2 className='text-center text-5xl font-bold'><span className='text-[#D70900]'>UBA</span> Cocktail Reception at UNGA</h2>
          <p className='text-center text-xl'>Present the code below at the reception</p>
          <QrCode className='w-72 h-72 border shadow-md rounded' />
        </div>
      </div>
    </section>
  )
}

export default Welcome;