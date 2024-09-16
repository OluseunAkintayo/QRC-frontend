import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className='shadow-md'>
      <div className='p-4 flex items-center justify-end'>
        <Avatar className="cursor-pointer select-none">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Header;
