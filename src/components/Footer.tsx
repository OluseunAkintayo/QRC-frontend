const Footer = () => {
  return (
    <footer className='shadow bg-slate-100'>
      <div className='max-w-screen-xl mx-auto'>
        <p className="text-sm text-center p-3">
          Powered by UBA Group &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

export default Footer;