import React from "react";
import Header from "./Header";
import { Sidebar } from "./Sidebar";

interface IAdminLayout {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: IAdminLayout) => {
  return (
    <section>
      <div className="flex">
        <Sidebar />
        <div className="header w-full">
          <Header />
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminLayout;
