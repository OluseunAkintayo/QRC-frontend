import React from 'react';
import { AppSidebar } from "@/components/Layout/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const [title, setTitle] = React.useState<string>(sessionStorage.getItem("title") ?? "");
  React.useEffect(() => {
    setTitle(sessionStorage.getItem("title") ?? "");
  }, [title]);

  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shadow sticky top-0 z-20 bg-white">
            <div className='flex items-center justify-between w-full px-4 md:px-8'>
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {
                      title.length > 0 &&
                      <>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>{title}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    }
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <Button variant="destructive">
                <LogOut className='w-4 mr-2' />
                Logout
              </Button>
            </div>
          </header>
          <div className="p-8">
            <div className="md:min-h-min">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}

export default Layout;
