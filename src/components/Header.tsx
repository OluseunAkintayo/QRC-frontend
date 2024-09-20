import logo from '@/assets/uba-logo.png';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }
  return (
    <header className='shadow-md'>
      <div className='max-w-screen-xl mx-auto'>
        <div className='p-4 flex items-center justify-between gap-2'>
          <div className="max-w-20">
            <img src={logo} alt="logo" />
          </div>
          <div>
            <Button variant='destructive' className='text-xs flex gap-2' onClick={logout}>
              <LogOut className='w-4' />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;