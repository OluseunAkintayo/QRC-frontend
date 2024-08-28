import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { LogOut } from "lucide-react";


const Header = () => {
  return (
    <header className='shadow-md'>
      <div className='p-4 flex items-center justify-between'>
        <h2>QRC</h2>
        <div>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>QR Codes</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>List</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Create</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Users</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>View all</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>New user</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Profile</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>View profile</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Settings</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  Logout <MenubarShortcut><LogOut className="w-4" /></MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </header>
  )
}

export default Header;
