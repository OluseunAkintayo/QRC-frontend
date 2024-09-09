import { Link, useLocation } from 'react-router-dom'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { QrCode, BarChart, Settings, Users, PlusCircle, List, LogOut } from 'lucide-react'

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart,
  },
  {
    title: "QR Codes",
    href: "/qr-codes",
    icon: QrCode,
  },
  {
    title: "Create QR Code",
    href: "/create-qr-code",
    icon: PlusCircle,
  },
  {
    title: "Campaigns",
    href: "/campaigns",
    icon: List,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-gray-100/40 dark:bg-gray-800/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link className="flex items-center gap-2 font-semibold" to="/">
          <QrCode className="h-6 w-6" />
          <span>QR Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          {sidebarNavItems.map((item, index) => (
            <Link key={index} to={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-2", 
                  pathname === item.href ? "bg-gray-200 dark:bg-gray-700" : ""
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <Button variant="outline" className="w-full justify-start gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
