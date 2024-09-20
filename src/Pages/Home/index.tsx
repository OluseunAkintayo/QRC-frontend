import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios, { AxiosRequestConfig } from "axios";
import React from "react";
import { IUser, IUserResponse } from "./IUser";
import { LoaderIcon } from "lucide-react";
import { Navigate } from "react-router-dom";
import UserComponent from "./UserComponent";

const nexus = sessionStorage.getItem('nexus') as string | null;

const BackToLogin = () => <Navigate to="/login" />;

const Home = () => {
  return nexus ? <LoadData /> : <BackToLogin />;
}

const LoadData = () => {
  const [users, setUsers] = React.useState<Array<IUser> | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const getUsers = async () => {
    setLoading(true);
    const config: AxiosRequestConfig = {
      url: "user/list",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${nexus}`
      }
    }
    try {
      const res = await axios.request(config);
      const response: IUserResponse = res.data;
      if (response.success) {
        setLoading(false);
        setUsers(response.data);
        return;
      }
      setError("Unable to load reception at this time");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("A server error has occurred");
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Header />
      <main className="max-w-screen-xl mx-auto">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4 h-full">
            <div className="md:max-w-[500px] w-full">
              <Input placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {
              (loading && !users) &&
              <div className="h-full grid place-items-center">
                <div className="flex gap-2 items-center">
                  Please wait  <LoaderIcon className="animate-spin" />
                </div>
              </div>
            }

            {
              (error && !loading && !users) &&
              <div className="h-full grid place-items-center">
                <div className="flex gap-2 items-center">
                  Please wait  <LoaderIcon className="animate-spin" />
                </div>
              </div>
            }

            {
              (!loading && users) &&
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[48px] font-bold">SN</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    users
                      .filter(item => {
                        if(search.trim().length === 0) return item;
                        if(item.fullName.toLowerCase().includes(search.toLowerCase())) return item;
                        if(item.company.toLowerCase().includes(search.toLowerCase())) return item;
                      })
                      .map((item, index) => <UserComponent item={item} sn={index + 1} getUsers={getUsers} />)
                  }
                </TableBody>
              </Table>
            }
          </div>
        </ScrollArea>
      </main>
      <Footer />
    </div>
  )
}

export default Home;