import { BarChart, Plus, QrCode } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart,
    isActive: true,
  },
  {
    title: "QR Codes",
    url: "/dashboard/qrcodes",
    icon: QrCode
  },
  // {
  //   title: "Add QR Code",
  //   url: "/dashboard/qrcodes/new",
  //   icon: Plus
  // }
]

export function NavMain() {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link to={item.url} className={cn("hover:bg-primary/5 hover:text-primary", location.pathname === item.url && "bg-primary/5 text-primary")}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={"Add new QR code"} asChild >
            <span className="hover:bg-primary/5 hover:text-primary">
              <Plus />
              <span>Add QR Code</span>
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
